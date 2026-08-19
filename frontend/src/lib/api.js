// ลำดับความสำคัญ:
// 1) ถ้ามี VITE_API_URL ใน .env ให้ใช้ค่านั้นก่อนเสมอ
// 2) ถ้าไม่มี ให้ใช้ hostname ปัจจุบัน + port 3001 สำหรับการพัฒนาในเครื่อง/LAN

const API_URL =
  import.meta.env.VITE_API_URL ||
  `http://${window.location.hostname}:3001`

const TOKEN_KEY = 'intranet_admin_token'

// ---------------------------------------------------------
// Upload URL helper
// แปลง relative URL จาก Database ให้เป็น URL ของ Backend
//
// เช่น:
// /api/uploads/34/download
// ↓
// https://intranet-pro.onrender.com/api/uploads/34/download
//
// ถ้าเป็น absolute URL อยู่แล้ว จะไม่เติม API_URL ซ้ำ
// ---------------------------------------------------------
export function getUploadUrl(url) {
  if (!url || typeof url !== 'string') return ''

  const trimmedUrl = url.trim()

  // Base64
  if (trimmedUrl.startsWith('data:')) {
    return trimmedUrl
  }

  // Blob URL
  if (trimmedUrl.startsWith('blob:')) {
    return trimmedUrl
  }

  // URL เต็ม
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl
  }

  // URL relative จาก Backend
  const normalizedUrl = trimmedUrl.startsWith('/')
    ? trimmedUrl
    : `/${trimmedUrl}`

  return `${API_URL}${normalizedUrl}`
}

// ---------------------------------------------------------
// Auth token
// ---------------------------------------------------------

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token)
    } else {
      sessionStorage.removeItem(TOKEN_KEY)
    }
  } catch {
    // ไม่เป็นไรถ้าเซฟไม่ได้ (private mode)
  }
}

// ---------------------------------------------------------
// Generic API request
// ---------------------------------------------------------

async function request(path, options = {}) {
  const token = getToken()

  const headers = {
    ...(options.headers || {}),
  }

  // FormData ต้องปล่อยให้ browser จัด Content-Type + boundary เอง
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let message = `เกิดข้อผิดพลาด (${res.status})`

    try {
      const body = await res.json()

      if (body?.error) {
        message = body.error
      }
    } catch {
      // ignore parse error
    }

    throw new Error(message)
  }

  if (res.status === 204) {
    return null
  }

  return res.json()
}

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

export const api = {
  // -------------------------------------------------------
  // content
  // -------------------------------------------------------

  getContent: () =>
    request('/api/content'),

  setContentKey: (key, value) =>
    request(`/api/content/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),

  resetContentKey: (key) =>
    request(`/api/content/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    }),

  // -------------------------------------------------------
  // auth
  // -------------------------------------------------------

  login: (username, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }),

  me: () =>
    request('/api/auth/me'),

  changePassword: (currentPassword, newPassword) =>
    request('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    }),

  // -------------------------------------------------------
  // uploads
  // -------------------------------------------------------

// -------------------------------------------------------
// uploads
// -------------------------------------------------------

listUploads: async (folder) => {
  const data = await request(
    `/api/uploads${
      folder
        ? `?folder=${encodeURIComponent(folder)}`
        : ''
    }`,
  )

  return Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        url: getUploadUrl(item.url),
      }))
    : data
},

uploadFile: async (folder, file) => {
  const form = new FormData()

  form.append('folder', folder)
  form.append('file', file)

  const data = await request('/api/uploads', {
    method: 'POST',
    body: form,
  })

  return data
    ? {
        ...data,
        url: getUploadUrl(data.url),
      }
    : data
},

uploadFileWithProgress: (folder, file, onProgress) =>
  new Promise((resolve, reject) => {
    const form = new FormData()

    form.append('folder', folder)
    form.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.open(
      'POST',
      `${API_URL}/api/uploads`,
    )

    const token = getToken()

    if (token) {
      xhr.setRequestHeader(
        'Authorization',
        `Bearer ${token}`,
      )
    }

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(
          Math.round(
            (e.loaded / e.total) * 100,
          ),
        )
      }
    }

    xhr.onload = () => {
      if (
        xhr.status >= 200 &&
        xhr.status < 300
      ) {
        try {
          const data = JSON.parse(xhr.responseText)

          resolve(
            data
              ? {
                  ...data,
                  url: getUploadUrl(data.url),
                }
              : data,
          )
        } catch {
          resolve(null)
        }

        return
      }

      let message = `อัปโหลดไม่สำเร็จ (${xhr.status})`

      try {
        const body = JSON.parse(xhr.responseText)

        if (body?.error) {
          message = body.error
        }
      } catch {
        // ignore
      }

      reject(new Error(message))
    }

    xhr.onerror = () => {
      reject(
        new Error(
          'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ',
        ),
      )
    }

    xhr.send(form)
  }),

deleteUpload: (id) =>
  request(`/api/uploads/${id}`, {
    method: 'DELETE',
  }),

// ใช้ URL จาก Database โดยตรง
downloadUrl: (url) =>
  getUploadUrl(url),

  // -------------------------------------------------------
  // users & roles
  // -------------------------------------------------------

  listUsers: () =>
    request('/api/users'),

  getAssignableRoles: () =>
    request('/api/users/roles-assignable'),

  createUser: (
    username,
    displayName,
    roleId,
  ) =>
    request('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        displayName,
        roleId,
      }),
    }),

  updateUserRole: (id, roleId) =>
    request(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        roleId,
      }),
    }),

  deleteUser: (id) =>
    request(`/api/users/${id}`, {
      method: 'DELETE',
    }),

  resetUserPassword: (id) =>
    request(
      `/api/users/${id}/reset-password`,
      {
        method: 'POST',
      },
    ),

  listRoles: () =>
    request('/api/roles'),

  getPermissionCatalog: () =>
    request(
      '/api/roles/permission-catalog',
    ),

  createRole: (name, label) =>
    request('/api/roles', {
      method: 'POST',
      body: JSON.stringify({
        name,
        label,
      }),
    }),

  setRolePermissions: (
    roleId,
    permissions,
  ) =>
    request(
      `/api/roles/${roleId}/permissions`,
      {
        method: 'PUT',
        body: JSON.stringify({
          permissions,
        }),
      },
    ),

  deleteRole: (id) =>
    request(`/api/roles/${id}`, {
      method: 'DELETE',
    }),

  // -------------------------------------------------------
  // setup password
  // -------------------------------------------------------

  checkSetupToken: (token) =>
    request(
      `/api/auth/setup-password/${token}`,
    ),

  setupPassword: (token, password) =>
    request(
      '/api/auth/setup-password',
      {
        method: 'POST',
        body: JSON.stringify({
          token,
          password,
        }),
      },
    ),
}