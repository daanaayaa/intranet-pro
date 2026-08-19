import { useState, useEffect } from 'react'

// แปลง URL ของไฟล์ที่อัปโหลดให้เปิดจาก Frontend ได้ (relative path จาก backend -> absolute)
// รูปแบบเดียวกับ getFileUrl ใน Announcement.jsx / CollectionEditor.jsx / OnCall.jsx
function getFileUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
  return `${API_URL}${url}`
}

// แต่ละรายการอาจมี "href" (ลิงก์ภายนอก) หรือ "file" (ไฟล์ที่อัปโหลด เช่น jpg/pdf) อย่างใดอย่างหนึ่ง
// href มาก่อนถ้ามีทั้งคู่ — เหมือน resolveLink ใน Announcement.jsx
function resolveLink(item) {
  if (item?.href) return item.href
  if (item?.file?.url) return getFileUrl(item.file.url)
  return null
}

export function DigitalServicePage({ service, onBack }) {
  const hasGroups = service?.groups && service.groups.length > 0
  const hasTree = service?.tree && service.tree.length > 0

  // selectedGroupIdx: null = หน้าวงกลม, ตัวเลข = กำลังดูลิสต์ของกลุ่มนั้น
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(null)
  const [stack, setStack] = useState([])

  useEffect(() => {
    setSelectedGroupIdx(null)
    setStack([])
  }, [service])

  if (!service) return null

  const selectedGroup = hasGroups && selectedGroupIdx !== null ? service.groups[selectedGroupIdx] : null

  const rootItems = hasTree ? service.tree : []
  const currentItems = stack.length === 0 ? rootItems : stack[stack.length - 1].items

  const enter = (node) => {
    if (node.children && node.children.length > 0) {
      setStack([...stack, { label: node.label, items: node.children }])
    }
  }
  const goBackTree = () => setStack(stack.slice(0, -1))
  const goToCrumb = (index) => setStack(index < 0 ? [] : stack.slice(0, index + 1))

  const handleTopBack = () => {
    if (selectedGroup) {
      setSelectedGroupIdx(null)
    } else {
      onBack()
    }
  }

  return (
    <div className="mx-auto max-w-[900px] px-8 pb-[60px] pt-[22px]">
      <button
        onClick={handleTopBack}
        className="mb-4 flex items-center gap-1.5 rounded-lg border-none bg-transparent text-[13px] font-medium text-blue-600"
      >
        <i className="ti ti-arrow-left text-base" />
        {selectedGroup ? service.label : 'กลับหน้าหลัก'}
      </button>

      <div className="mb-6 flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px]"
          style={{ background: service.color }}
        >
          <i className={`ti ${service.icon} text-lg text-white`} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">
          {selectedGroup ? selectedGroup.title : service.label}
        </h2>
      </div>

      {/* หน้าวงกลม — จัดกลางแบบ grid ระยะห่างเท่ากันทุกช่อง ไม่ว่าความยาวข้อความจะต่างกัน */}
      {hasGroups && !selectedGroup && (
        <div className="grid grid-cols-4 justify-items-center gap-y-8 gap-x-4 py-4 max-[560px]:grid-cols-2">
          {service.groups.map((g, i) => {
            const circle = (
              <span
                className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full text-white opacity-90 shadow-md transition-opacity hover:opacity-100"
                style={g.img ? {} : { background: service.color }}
              >
                {g.img ? (
  <img
    src={getFileUrl(g.img)}
    alt={g.title}
    className="h-full w-full object-cover"
  />
) : (
  <i className={`ti ${g.icon || 'ti-folder'} text-4xl`} />
)}
              </span>
            )
            const labelEl = (
              <span className="mt-2.5 block text-[13px] font-medium leading-tight text-ink-soft">{g.title}</span>
            )

            // กลุ่มมีลิงก์/ไฟล์ตรงตัว (href หรือ file) -> เปิดแท็บใหม่ทันที ไม่ต้องเข้าไปดูลิสต์ย่อย
            const groupLink = resolveLink(g)
            if (groupLink) {
              return (
                <a
                  key={g.title}
                  href={groupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-[130px] flex-col items-center text-center no-underline"
                >
                  {circle}
                  {labelEl}
                </a>
              )
            }

            return (
              <button
                key={g.title}
                type="button"
                onClick={() => setSelectedGroupIdx(i)}
                className="flex w-[130px] flex-col items-center border-none bg-transparent text-center"
              >
                {circle}
                {labelEl}
              </button>
            )
          })}
        </div>
      )}

      {/* หน้าลิสต์ของกลุ่มที่เลือก — บังคับ 2 คอลัมน์เท่ากันเสมอด้วย grid-cols-2 */}
      {hasGroups && selectedGroup && (
        <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
          {selectedGroup.items?.map((item, i) => {
            const link = resolveLink(item)
            return (
              <a
                key={i}
                href={link || '#'}
                {...(link && { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                  <i className={`ti ${item.icon || 'ti-file-text'} text-base text-blue-600`} />
                </div>
                <span className="flex-1 text-[13px] leading-tight text-ink">{item.label}</span>
                <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
              </a>
            )
          })}
          {!selectedGroup.items?.length && (
            <p className="col-span-full py-6 text-center text-[13px] text-ink-soft">ยังไม่มีรายการในหัวข้อนี้</p>
          )}
        </div>
      )}

      {hasTree && (
        <>
          {stack.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-lg bg-blue-tint/40 px-3.5 py-2 text-[12px] font-semibold text-ink-soft">
              <button type="button" onClick={goBackTree} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-blue-600 hover:bg-blue-100">
                <i className="ti ti-chevron-left text-sm" />ย้อนกลับ
              </button>
              <span className="text-line">|</span>
              <button type="button" onClick={() => goToCrumb(-1)} className="rounded px-1 hover:bg-blue-100 hover:text-blue-600">
                {service.label}
              </button>
              {stack.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <i className="ti ti-chevron-right text-[10px]" />
                  <button type="button" onClick={() => goToCrumb(i)} className="rounded px-1 hover:bg-blue-100 hover:text-blue-600">
                    {s.label}
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
            {currentItems.map((node, i) => {
              const hasChildren = node.children && node.children.length > 0
              if (hasChildren) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => enter(node)}
                    className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 text-left transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                      <i className={`ti ${node.icon || 'ti-file-text'} text-base text-blue-600`} />
                    </div>
                    <span className="flex-1 text-[13px] leading-tight text-ink">{node.label}</span>
                    <i className="ti ti-chevron-right flex-shrink-0 text-sm text-ink-soft/60" />
                  </button>
                )
              }
              const link = resolveLink(node)
              return (
                <a
                  key={i}
                  href={link || '#'}
                  {...(link && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5 no-underline transition-colors hover:border-blue-500/40 hover:bg-blue-tint"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-tint">
                    <i className={`ti ${node.icon || 'ti-file-text'} text-base text-blue-600`} />
                  </div>
                  <span className="flex-1 text-[13px] leading-tight text-ink">{node.label}</span>
                </a>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}