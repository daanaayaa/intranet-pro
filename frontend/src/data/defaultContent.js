import promoDental from '../assets/promo-dental.jpg'
import promoCheckup from '../assets/promo-checkup.jpg'
import promoPed from '../assets/promo-ped.jpg'
import promoGyn from '../assets/promo-gyn.webp'
import promoMed from '../assets/promo-med.jpg'

import hrPeopleConnect from '../assets/digital-services/hr-people-connect.png'
import hrForms from '../assets/digital-services/hr-forms.png'
import hrPolicy from '../assets/digital-services/hr-policy.png'
import hrTrainingHours from '../assets/digital-services/hr-training-hours.png'

import divisionTpp from '../assets/division-tpp.jpg'
import divisionMedical from '../assets/division-medical.jpg'
import divisionFinance from '../assets/division-finance.jpg'
import divisionIt from '../assets/division-it.jpg'
import { HEALTHCARE_PARTNERS } from './Partnerhealthcarelist'
import { CLINIC_NURSE_PARTNERS } from './Clinicnursepartners'
import { PRE_EMPLOYMENT_HEALTH_CHECK_PARTNERS } from './Preemploymenthealthcheckpartners'
import { ANNUAL_HEALTH_CHECK_PARTNERS } from './Annualhealthcheckpartners'
import { PRE_INSURANCE_HEALTH_CHECK_PARTNERS } from './Annualhealthcheckpartners'
import { SCHOOL_GROUP_INSURANCE_PARTNERS } from './Schoolpartners'
import { OPD_PED_PACKAGE_ITEMS, OPD_GYN_PACKAGE_ITEMS } from './Promopackageitems'

/* ------------------------------------------------------------------
   DEFAULT_CONTENT
   ค่าเริ่มต้นทั้งหมดของเว็บไซต์ ถูกรวบรวมมาจากไฟล์ต่างๆ ที่เคยกระจัดกระจาย
   (config/data.js, Announcement.jsx, RequestGrid.jsx, ReportGrid.jsx,
   DoctorSchedulePage.jsx, ExpandableCards.jsx) ให้มาอยู่ที่เดียว

   ContentContext จะโหลดค่าจากไฟล์นี้เป็นค่าเริ่มต้น แล้ว "ทับ" ด้วยข้อมูล
   ที่ผู้ดูแลระบบแก้ไขและบันทึกไว้ใน localStorage
   ห้ามลบ key ใดออกโดยไม่แก้ adminSchemas.js และคอมโพเนนต์ที่เกี่ยวข้องด้วย
------------------------------------------------------------------ */

export const DEFAULT_CONTENT = {
  // ---------------- ตั้งค่าเว็บไซต์ ----------------
  SITE: {
    orgName: 'Bangkok Hospital Siriroj',
    orgTag: 'ระบบสารสนเทศภายในสำหรับบุคลากรโรงพยาบาลกรุงเทพสิริโรจน์',
    location: 'Phuket, Thailand',
    hotlineLabel: 'Internal Hotline',
  },

  // ---------------- หน้า Home ----------------
  SECTIONS: [
    { id: 'sec-ann', label: 'ข่าวประชาสัมพันธ์', icon: 'ti-speakerphone', color: 'var(--color-coral)' },
    { id: 'sec-digital', label: 'Digital Services', icon: 'ti-device-desktop', color: 'var(--color-blue-600)' },
    { id: 'sec-nsystem', label: 'ระบบงานออนไลน์โรงพยาบาล', icon: 'ti-world', color: 'var(--color-blue-600)' },
    { id: 'sec-contact', label: 'Contact Tools', icon: 'ti-phone-call', color: 'var(--color-blue-600)' },
    { id: 'sec-doctor', label: 'ตารางแพทย์', icon: 'ti-stethoscope', color: 'var(--color-coral)' },
    { id: 'sec-oncall', label: 'ตารางเวรผู้บริหาร/พยาบาล', icon: 'ti-user-shield', color: 'var(--color-blue-600)' },
    { id: 'sec-quality', label: 'ศูนย์รวมระบบคุณภาพและความปลอดภัย', icon: 'ti-shield-check', color: 'var(--color-teal)' },
    { id: 'sec-nursing', label: 'ข่าวประชาสัมพันธ์พยาบาล', icon: 'ti-news', color: 'var(--color-coral)' },
    { id: 'sec-promo', label: 'โปรโมชันและแพ็กเกจสุขภาพ', icon: 'ti-star', color: 'var(--color-coral)' },
    { id: 'sec-partner', label: 'รายชื่อลูกค้าบริษัทคู่สัญญา', icon: 'ti-building', color: 'var(--color-blue-600)' },
    { id: 'sec-template', label: 'Template PowerPoint', icon: 'ti-presentation', color: 'var(--color-ink-soft)' },
    { id: 'sec-finance', label: 'การมอบหมายอำนาจดำเนินการทางการเงิน กลุ่ม 6', icon: 'ti-cash', color: 'var(--color-ink-soft)' },
    { id: 'sec-upload', label: 'Upload เอกสาร', icon: 'ti-upload', color: 'var(--color-ink-soft)' },
  ],

  CONTACT_LINKS: [
  { label: 'Extension No.', icon: 'ti-phone-call', href: '' },
  { label: 'Hotline', icon: 'ti-stethoscope', href: '' },
],

  ANN_NEWS: [
    { icon: 'ti-building-bank', title: 'เปิดสิทธิ์ใช้งานระบบ My B+ สำหรับบุคลากร', sub: 'ลงทะเบียนรับสิทธิประโยชน์และส่วนลดพิเศษสำหรับพนักงานทุกท่าน เริ่มวันนี้', pinned: true, badge: 'New' },
    {icon: 'ti-building-bank',title: 'สิทธิข้าราชการกรมบัญชีกลาง',sub: 'ข้อมูลและแนวทางการใช้สิทธิเบิกจ่ายตรง',
      tree: [
        { label: 'ข้อมูลสิทธิ' },
        { label: 'ตรวจสอบสิทธิสวัสดิการรักษาพยาบาลข้าราชการ' },
        { label: 'Brochure 1' },
        { label: 'Brochure 2' },
        { label: 'Brochure 3' },
        { label: 'Brochure 4' },
        { label: 'Brochure 5' },
        { label: 'Brochure 6' },
        {
          label: 'โรคและข้อบ่งชี้หัตถการกรมบัญชีกลาง',
          children: [
            {
              label: 'Eye Ear Nose Throat',
              children: [{ label: 'การผ่าตัดปากแหว่ง (F012)' }],
            },
            {
              label: 'Eye',
              children: [
                { label: 'การผ่าตัดสลายต้อกระจกด้วยคลื่นเสียง (G011)' },
                { label: 'การผ่าตัดต้อกระจกด้วยวิธีอื่น (G012)' },
              ],
            },
        {
          label: 'OB & GYN',
          children: [
            { label: 'การคลอดและการช่วยคลอด (D010), การคลอดและการช่วยคลอด+ทำหมัน (D011), การผ่าตัดทำหมันหญิง (D030)' },
            { label: 'การผ่าตัดคลอด (D020), การผ่าตัดคลอด+ทำหมัน (D021)' },
            { label: 'การผ่าตัดเนื้องอกมดลูกแบบเปิด (D051), การผ่าตัดเนื้องอกมดลูกด้วยกล้อง (D052)' },
            { label: 'การผ่าตัดเนื้องอกรังไข่แบบเปิด (D061), การผ่าตัดเนื้องอกรังไข่ด้วยกล้อง (D062)' },
            { label: 'การผ่าตัดมดลูกทางช่องคลอดด้วยกล้อง (D042)' },
            { label: 'เด็กแรกเกิด_เด็กปกติ (D980), เด็กแรกเกิด_เด็กป่วย (D990)' },
          ],
        },
            {
              label: 'Orthopedic Surgery',
              children: [
                { label: 'การผ่าตัดแก้ไขโพรงกระดูกสันหลังส่วนเอวตีบแคบ (B060)' },
                { label: 'การผ่าตัดเปลี่ยนข้อเข่า (B011)' },
                { label: 'การผ่าตัดเปลี่ยนข้อสะโพก (B021)' },
                { label: 'การผ่าตัดสร้างเอ็นไขว้หน้าข้อเข่า (B070)' },
              ],
            },
            {
              label: 'Surgery',
              children: [
                { label: 'การผ่าตัดถุงน้ำดีแบบผ่านกล้อง (A012)' },
                { label: 'การผ่าตัดริดสีดวงทวาร (A030)' },
                { label: 'การผ่าตัดไส้เลื่อน 2 ข้าง (A022)' },
                { label: 'การผ่าตัดไส้เลื่อนข้างเดียว (A021), การผ่าตัดไส้เลื่อนขาหนีบข้างเดียวด้วยกล้อง (A023)' },
                { label: 'การผ่าระบายหนอง (A041), การผ่าโพรงฝีคัณฑสูตร (A042)' },
              ],
            },
            {
              label: 'Surg_Ped',
              children: [
                { label: 'การผ่าตัดถุงน้ำลูกอัณฑะในเด็ก (C040)' },
                { label: 'การผ่าตัดไส้เลื่อนในเด็ก (C010)' },
                { label: 'การผ่าตัดอัณฑะค้าง (C050)' },
              ],
            },
            {
              label: 'Uro',
              children: [
                { label: 'การผ่าไตนิ่วท่อไต-กรวยไตออกผ่านทางท่อปัสสาวะด้วยกล้อง (E016)' },
                { label: 'การผ่าตัดต่อมลูกหมากผ่านกล้อง (E020)' },
                { label: 'การผ่าตัดนิ่วท่อไต (E014), การผ่าตัดนิ่วออกจากกระเพาะปัสสาวะ (E015)' },
              ],
            },
          ],
        },
      ],
    },
  {
    icon: 'ti-file-check',
    title: 'ข้อมูลเช็คสิทธิ์บริษัทประกัน',
    sub: 'ตรวจสอบสิทธิ์ความคุ้มครองก่อนเข้ารับบริการ',
    tree: [
      { label: 'BDMS AIA-EDI' },
      { label: 'AIA' },
      { label: 'บริษัท กรุงไทย แอกซ่า' },
      { label: 'เมืองไทย EasyCare' },
      { label: 'ไทยประกันกลุ่ม' },
      { label: 'บ.ฟิลลิปประกันชีวิต จก.' },
      { label: 'TOKIO MARINE' },
      { label: 'อยุธยา อลิอันซ์ (ประกันกลุ่ม)' },
      { label: 'TPA (NEW)' },
      { label: 'บ.ชับบ์สามัคคีประกันภัย' },
      { label: 'ตรวจสอบสิทธิ์ บ.AXA HELATH' },
      { label: 'การตรวจสอบสิทธิ์ผ่านระบบ HBC' },
      { label: 'E-Link HBC' },
      { label: 'Vhospital' },
      { label: 'F.W.D.' },
      { label: 'BUPA ME' },
      { label: 'Web Claim Thaisamut' },
      { label: 'BKKGH(กรุงเทพประกันชีวิตกลุ่ม)' },
      { label: 'บ.อาคเนย์(กลุ่ม)' },
      { label: 'MED-SURE Service' },
      { label: 'บ.ซัมซุงประกันชีวิต จก.' },
      { label: 'E-claim (New)' },
      { label: 'เมดิลิงค์ (Medilink)' },
      { label: 'บริษัท เอจีเอ เซอร์วิสเซส(ประเทศไทย) จำกัด' },
      { label: 'บ.ลอร์ตันเอเชีย AWP Services (Thailand)' },
      { label: 'SmileClaim' },
      { label: 'CIGNA Web Portal' },
      { label: 'บ.เมืองไทยประกันภัย (MTI Care Services)' },
      { label: 'ระบบ EZ Rewards สำหรับโรงพยาบาล' },
      { label: 'E-Claim' },
      { label: 'AIA EMPLOYEE' },
      { label: 'HBC WEB DIRECT' },
      { label: 'MSIG' },
      { label: 'TL SMART CLAIM' },
      { label: 'ตรวจสอบสิทธิ์ข้อมูลประกัน' },
      { label: 'AACP OPD' },
      { label: 'ตัวอย่างบัตรบริษัทประกัน' },
      { label: 'ตารางบริษัทจัดการสินไหม HBC' },
      { label: 'Generali e-Hospital Claim' },
      { label: 'BLA Claim' },
      { label: 'ใบรับรองสิทธิ์เพื่อการรักษาพยาบาลแบบผู้ป่วยใน HBC' },
      { label: 'ใบรับรองแพทย์ HBC 2' },
      { label: 'ข้อมูลเกี่ยวกับ HBC' },
      { label: 'คู่มือการใช้งาน BLA Claim' },
      { label: 'คู่มือการใช้งานระบบปฏิบัติการ เอช ซี เอ็ม เอส สำหรับสถานพยาบาล' },
      { label: 'คู่มือการใช้งานระบบ EZ Rewards สำหรับโรงพยาบาล' },
      { label: 'Cynergy Care' },
      { label: 'BKIMedClaim' },
      { label: 'บริษัท เอช ซี เอ็ม เอส 2019 จำกัด' },
      { label: 'AXA ประกันภัย' },
      { label: 'บริษัท ทิพยประกันภัย จำกัด มหาชน' },
      { label: 'บริษัท ประกันภัยไทยวิวัฒน์' },
      { label: 'เช็คสิทธิ์ประกันสังคม' },
      { label: 'บริษัท Sunday Care' },
      { label: 'Air Doctor' },
      { label: 'บริษัท LMG' },
      { label: 'บ.ไทยยามาฮ่ามอเตอร์ จำกัด' },
      { label: 'บ.กรุงเทพประกันภัย TQC' },
      { label: 'Allianz Health Care Card - Check up' },
      { label: 'eClaim nhso' },
      { label: 'Healthplatformkrungthai' },
      { label: 'Luma Health Insurance' },
    ],
  },
    { icon: 'ti-target-arrow', title: 'BSI Vision Mission 2022', sub: 'วิสัยทัศน์และพันธกิจโรงพยาบาล' },
    {
      icon: 'ti-shield-check',
      title: 'Occupational Health and Safety',
      sub: 'แนวทางอาชีวอนามัยและความปลอดภัย',
      tree: [
        { label: 'Occupational Health and Safety Policy' },
        { label: 'Occupational Health and Safety Committee' },
        { label: 'Occupational Health and Safety Manual' },
        { label: 'HSE Statistics' },
        { label: 'สิทธิและหน้าที่ของนายจ้าง ลูกจ้าง ในด้านความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมการทำงานของโรงพยาบาล' },
      ],
    },
    { icon: 'ti-test-pipe', title: 'การเก็บสิ่งส่งตรวจทางห้องปฏิบัติการ', sub: 'ขั้นตอนและมาตรฐานการเก็บตัวอย่างส่งตรวจ' },
    { icon: 'ti-phone', title: 'หมายเลขโทรศัพท์ภายในเครือข่าย BDMS (Free Call)', sub: 'รายชื่อเบอร์โทรศัพท์ภายในกลุ่ม BDMS' },
    { icon: 'ti-device-mobile', title: 'หมายเลขโทรศัพท์มือถือของแผนกต่างๆ', sub: 'เบอร์ติดต่อมือถือประจำแผนกในโรงพยาบาล' },
  ],

DIGITAL_SERVICES: [
    { icon: 'ti-world', label: 'Office 365', color: 'var(--color-blue-600)' },
    {
      icon: 'ti-users', label: 'HR System', color: 'var(--color-blue-600)',
      groups: [
        {
          title: 'การใช้งานระบบ People Connect',
          icon: 'ti-user-cog',
          img: hrPeopleConnect,
          items: [
            { label: 'Time Off', icon: 'ti-calendar-off' },
            { label: 'People Connect Staff New', icon: 'ti-user-plus' },
            { label: 'People Connect Manager', icon: 'ti-user-star' },
            { label: 'ข้อมูลรายชื่อพนักงาน BSI', icon: 'ti-address-book' },
            { label: 'หลักเกณฑ์การลา', icon: 'ti-calendar-event' },
          ],
        },
        {
          title: 'แบบฟอร์ม',
          icon: 'ti-file-description',
          img: hrForms,
          items: [
            { label: 'แบบขอรับเงินคืน กรณีใช้สิทธิ์ประกันส่วนตัว', icon: 'ti-cash-banknote' },
            { label: 'แบบฟอร์มใบส่งตัวใช้สิทธิ์สวัสดิการ การรักษาพยาบาล', icon: 'ti-file-certificate' },
            { label: 'แบบฟอร์มขออนุมัติแบ่งจ่ายค่ารักษาพยาบาล', icon: 'ti-receipt' },
            { label: 'ใบส่งตัวพนักงานรักษาพยาบาล กรณีส่งตัวไปรักษาที่ BPK', icon: 'ti-building-hospital' },
            { label: 'แบบฟอร์มขอบัตรโดยสาร Bangkok Airway ไทย ประจำปี 2026', icon: 'ti-plane' },
            { label: 'แบบฟอร์มขอบัตรโดยสาร Bangkok Airway อังกฤษ ประจำปี 2026', icon: 'ti-plane' },
            { label: 'แบบฟอร์มใบสมัครโครงการอุณหภูมิความสุข', icon: 'ti-mood-smile' },
          ],
        },
        {
          title: 'Policy',
          icon: 'ti-shield-check',
          img: hrPolicy,
          items: [
            { label: '023-2565 นโยบายการบริหารสวัสดิการค่ารักษาพยาบาล', icon: 'ti-file-text' },
            { label: 'สนบ.028-2560 ข้อปฏิบัติในการใช้โทรศัพท์มือถือและการใช้ Social Media', icon: 'ti-device-mobile' },
            { label: 'สนบ.002-2559 ระเบียบการใช้พื้นที่จอดรถโรงพยาบาลสิริโรจน์', icon: 'ti-parking' },
            { label: 'CEO.006_2558 นโยบายการให้ส่วนลด BPI', icon: 'ti-discount-2' },
            { label: 'วันหยุดของโรงพยาบาล ประจำปี 2569', icon: 'ti-calendar-star' },
            { label: 'ประกาศการบริหารชั่วโมงสะสม OT/RLV/ADM ในหน้า Intranet', icon: 'ti-clock-hour-4' },
            { label: 'สรุปการลาทุกประเภทของพนักงาน', icon: 'ti-report' },
            { label: 'หลักเกณฑ์ค่าเบี้ยเลี้ยงเดินทาง', icon: 'ti-car' },
          ],
        },
        {
          title: 'BSI Training Hours',
          icon: 'ti-clock-hour-4',
          img: hrTrainingHours,
          items: [
            { label: 'ชั่วโมงอบรมสะสมของพนักงาน', icon: 'ti-clock-check' },
          ],
        },
      ],
    },
    { icon: 'ti-flame', label: 'Fire Marshal', color: 'var(--color-coral)' },
    { icon: 'ti-database', label: 'BDMS Intranet', color: 'var(--color-blue-600)' },
    { icon: 'ti-message-circle', label: 'BES', color: 'var(--color-blue-600)' },
    {
      icon: 'ti-link', label: 'Drug Information', color: 'var(--color-blue-600)',
      tree: [
        { label: 'บัญชียาโรงพยาบาลสิริโรจน์', icon: 'ti-list-details' },
        {
          label: 'ข้อมูลยาใหม่ที่เข้าบัญชียาโรงพยาบาล', icon: 'ti-calendar-stats',
          children: [
            { label: 'ปี 2567', children: [{ label: 'มกราคม' }] },
            { label: 'ปี 2566', children: [{ label: 'มกราคม' }, { label: 'มีนาคม' }, { label: 'กรกฎาคม' }, { label: 'กันยายน' }, { label: 'พฤศจิกายน' }] },
            { label: 'ปี 2565', children: [{ label: 'พฤษภาคม' }, { label: 'กรกฎาคม' }, { label: 'กันยายน' }, { label: 'พฤศจิกายน' }] },
            { label: 'ปี 2564', children: [{ label: 'มีนาคม' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2563', children: [{ label: 'มกราคม' }, { label: 'มีนาคม' }, { label: 'กรกฎาคม' }, { label: 'กันยายน' }, { label: 'พฤศจิกายน' }] },
            { label: 'ปี 2562', children: [{ label: 'มกราคม' }, { label: 'มีนาคม' }, { label: 'พฤษภาคม' }, { label: 'กรกฎาคม' }, { label: 'กันยายน' }] },
            { label: 'ปี 2561', children: [{ label: 'พฤศจิกายน' }, { label: 'ตุลาคม' }, { label: 'สิงหาคม' }, { label: 'มิถุนายน' }, { label: 'เมษายน' }, { label: 'กุมภาพันธ์' }] },
            { label: 'ปี 2560', children: [{ label: 'ธันวาคม' }, { label: 'ตุลาคม' }, { label: 'สิงหาคม' }, { label: 'มิถุนายน' }, { label: 'มีนาคม' }] },
            { label: 'ปี 2559', children: [{ label: 'ธันวาคม' }, { label: 'ตุลาคม' }, { label: 'กันยายน' }, { label: 'มิถุนายน' }, { label: 'มีนาคม' }, { label: 'มกราคม' }] },
            { label: 'ปี 2558', children: [{ label: 'กันยายน' }, { label: 'กรกฎาคม' }, { label: 'มิถุนายน' }, { label: 'มีนาคม' }] },
            { label: 'ปี 2557', children: [{ label: 'ธันวาคม' }, { label: 'สิงหาคม' }, { label: 'กรกฎาคม' }, { label: 'เมษายน' }, { label: 'มกราคม' }] },
          ],
        },
        {
          label: 'รายการยาเปลี่ยนแปลงรูปแบบและยาเปลี่ยนบริษัท', icon: 'ti-replace',
          children: [
            { label: 'ปี 2569', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'มีนาคม' }, { label: 'เมษายน' }, { label: 'พฤษภาคม' }, { label: 'มิถุนายน' }, { label: 'กรกฎาคม' }] },
            { label: 'ปี 2568', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'มีนาคม' }, { label: 'เมษายน' }, { label: 'พฤษภาคม' }, { label: 'มิถุนายน' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2567', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'มีนาคม' }, { label: 'เมษายน' }, { label: 'พฤษภาคม' }, { label: 'มิถุนายน' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2566', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'มีนาคม' }, { label: 'เมษายน' }, { label: 'พฤษภาคม' }, { label: 'มิถุนายน' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2565', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'มีนาคม' }, { label: 'พฤษภาคม' }, { label: 'มิถุนายน' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2564', children: [{ label: 'มกราคม' }, { label: 'มีนาคม' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2563', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'เมษายน' }, { label: 'กันยายน' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2562', children: [{ label: 'กุมภาพันธ์' }, { label: 'เมษายน' }, { label: 'มิถุนายน' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ตุลาคม' }] },
            { label: 'ปี 2561', children: [{ label: 'มกราคม' }, { label: 'กุมภาพันธ์' }, { label: 'พฤษภาคม' }, { label: 'กรกฎาคม' }, { label: 'สิงหาคม' }, { label: 'กันยายน' }, { label: 'ธันวาคม' }] },
            { label: 'ปี 2560', children: [{ label: 'มกราคม' }, { label: 'มีนาคม' }, { label: 'เมษายน' }, { label: 'ตุลาคม' }, { label: 'พฤศจิกายน' }, { label: 'ธันวาคม' }] },
          ],
        },
        { label: 'รายการยาที่มีความเสี่ยงสูง (HIGH ALERT DRUG)', icon: 'ti-alert-triangle' },
        {
          label: 'รายการยาชื่อพ้องมองคล้าย (LOOK-ALIKE SOUND-ALIKE)', icon: 'ti-copy',
          children: [
            { label: 'บัญชีรายการยา Sound alike 1/06/2026' },
            { label: 'บัญชีรายการยา Look alike 25/07/2026' },
          ],
        },
        { label: 'รายการยาจำเป็นช่วยชีวิต (VITAL DRUGS)', icon: 'ti-heartbeat' },
        {
          label: 'รายการยาและข้อมูลยา SMP (SAFETY MONITORING PROGRAM)', icon: 'ti-shield-check',
          children: [
            { label: 'รายการยา SMP', children: [{ label: 'รายการยา SMP 24/05/2026' }] },
            { label: 'ข้อมูลยา SMP', children: [{ label: 'ข้อมูลยา SMP 24/05/2026' }] },
          ],
        },
        { label: 'รายการยาที่ทำให้เสี่ยงต่อการพลัดตกหกล้ม (DRUG FALL LIST)', icon: 'ti-alert-octagon' },
        {
          label: 'ข้อมูล Vaccine', icon: 'ti-syringe',
          children: [
            { label: 'ตารางการให้วัคซีนในเด็กไทย' },
            { label: 'วัคซีนสำหรับนักท่องเที่ยว' },
            { label: 'แนวทางการบริหารวัคซีนทั่วไปในโรงพยาบาลกรุงเทพสิริโรจน์' },
            { label: 'แนวทางการบริหารวัคซีนเด็กในโรงพยาบาลกรุงเทพสิริโรจน์' },
            { label: 'ตารางการให้วัคซีน Prevnar 13 + Pneumo 23' },
          ],
        },
        {
          label: 'ข้อมูลทั่วไป', icon: 'ti-info-circle',
          children: [
            { label: 'แนวทางการกำหนดวันหมดอายุยา' },
            { label: 'รายการยาเก็บป้องกันแสง (22/03/2025)' },
            { label: 'รายการยา G-6-PD' },
            { label: 'รายการยาที่ควรระมัดระวังการใช้ก่อนผ่าตัด' },
            { label: 'ข้อมูล Pregnancy Category' },
            { label: 'PIH Guidelines for timely medication administration' },
            { label: 'แหล่งหายากจำเป็น (vital drug) ของโรงพยาบาลสิริโรจน์ 48 รายการ' },
            { label: 'ปรับลดขนาดยา Paracetamol สูงสุดต่อวัน ลดความเสี่ยงต่อการเกิดความเป็นพิษต่อตับ' },
            { label: 'ข้อมูลผลิตภัณฑ์นมสำหรับทารก' },
            { label: 'ข้อมูลผลิตภัณฑ์/อาหารทางการแพทย์สำหรับผู้ใหญ่' },
            { label: 'Common Photosensitizing Medications' },
            { label: 'นิยามและรายชื่อยาที่ทำให้เกิด Photosensitivity (ภาษาไทย)' },
            { label: 'รายการยาที่มีความเสี่ยงต่อการเกิด Phlebitis' },
          ],
        },
        {
          label: 'Adverse Drug Reaction', icon: 'ti-report-medical',
          children: [
            { label: 'ข้อมูลยาและผื่นแพ้ยาที่พบบ่อย' },
            { label: 'การแพ้ยาข้ามกลุ่ม Beta-lactam antibiotics' },
            { label: 'การแพ้ยาข้ามกลุ่ม NSAIDs' },
            { label: 'การแพ้ยาข้ามกลุ่ม Opioids' },
          ],
        },
        {
          label: 'แนวทางการรักษา', icon: 'ti-clipboard-heart',
          children: [
            { label: 'แนวทางการตรวจวินิจฉัย รักษาและป้องกันการติดเชื้อ HIV ประเทศไทย ปี 2563/2564' },
            { label: 'ตารางการให้ยาป้องกันการติดเชื้อ HIV หลังสัมผัสเชื้อ ตามแนวเวชปฏิบัติ ปี 2563/2564' },
            { label: 'การดูแลรักษาผู้สัมผัสโรคพิษสุนัขบ้าหรือสงสัยว่าสัมผัส ตามแนวทางเวชปฏิบัติโรคพิษสุนัขบ้าและคำถามที่พบบ่อย ฉบับปรับปรุง 2562' },
            { label: 'แนวทางการใช้ยาป้องกันมาลาเรียสำหรับผู้เดินทาง' },
            { label: 'แนวทางการใช้ยา OSELTAMIVIR (GPO-A Flu) สำหรับรักษาและป้องกันไข้หวัดใหญ่' },
            { label: 'แนวทางเวชปฏิบัติ การวินิจฉัย ดูแลรักษา กรณีติดเชื้อไวรัสโคโรนา 2019 (COVID-19)' },
          ],
        },
        {
          label: 'การคำนวณและการเตรียมยา', icon: 'ti-calculator',
          children: [
            { label: 'ข้อมูลยาอัตราส่วน 10/03/2558' },
            { label: 'การคำนวณปริมาณอาหารทางการแพทย์' },
            { label: 'การเตรียมสารน้ำในกรณีที่ไม่มีความเข้มข้นที่แพทย์ต้องการใช้ในโรงพยาบาล แผนกเภสัชกรรม โรงพยาบาลสิริโรจน์' },
            { label: 'ความคงตัวของยา ANTIBIOTIC inj หลังจากเจือจาง' },
            { label: 'การให้ยาลดไข้เด็กที่มีไข้ Standing order' },
            { label: 'ยาปฏิชีวนะชนิดผงแห้งที่ต้องเติมน้ำให้ครบตามปริมาตรที่กำหนด' },
            { label: 'เภสัชตำรับ รพ.สิริโรจน์' },
          ],
        },
        {
          label: 'ข้อมูลยา', icon: 'ti-pill',
          children: [
            { label: 'ข้อมูลยา Max Dose กลุ่มยารักษาเบาหวาน ลดไขมันในเลือด ลดความดันโลหิตสูง และโรคหลอดเลือดหัวใจ' },
            { label: 'ข้อมูลยา Max Dose กลุ่มยา NSAIDs 01/02/11' },
            { label: 'ข้อมูลยา (Drug) และภาวะหลอดเลือดดำอักเสบ (Phlebitis)' },
            { label: 'ข้อมูลยาในกล่องฉุกเฉิน' },
            { label: 'Onset and duration of insulin preparation' },
            { label: 'Onset and duration of opioid and non-opioid drug' },
            { label: 'Onset and duration of Sedative Drug (ยานอนหลับ)' },
            { label: 'ข้อมูลยาคลินิกทันตกรรม' },
            { label: 'ค่าครึ่งชีวิตของยาปฏิชีวนะที่ใช้ในผู้ป่วยผ่าตัด' },
            { label: 'คำแนะนำในการใช้และเทคนิคการฉีด HRIG' },
            { label: 'แนวทางในการให้ยาทางหลอดเลือดดำ สารละลายที่แนะนำให้ใช้ผสม ปริมาตรที่ใช้ ความเข้มข้นหลังผสม อัตราการให้ยา และความคงตัวของยาหลังผสม' },
            { label: 'ข้อมูลน้ำเกลือที่ใช้ผสมยา Antibiotic' },
            { label: 'ข้อมูล onset และ duration ของยาฉีดแก้ปวด' },
            { label: 'รายการยาฉีดที่ต้องเจือจางและอาการไม่พึงประสงค์' },
            { label: 'P2Y12 inhibitors' },
            { label: 'ข้อมูลแนะนำการปรับขนาดยากลุ่ม Antibiotic injection ในผู้ป่วยที่มีการทำงานของไตบกพร่อง' },
            { label: 'ตำรับยาจีนและสรรพคุณยา' },
            { label: 'ตำรับยาจีนที่ใช้บ่อยในประเทศไทย เล่ม 1' },
            { label: 'ตำรับยาจีนที่ใช้บ่อยในประเทศไทย เล่ม 2' },
            { label: 'ตำรับยาจีนที่ใช้บ่อยในประเทศไทย เล่ม 3' },
            { label: 'stock คลังยาของศูนย์ SAFE' },
            { label: 'stock ห้องยาของศูนย์ SAFE' },
            { label: 'Dose Phenytoin' },
            { label: 'ข้อมูลการใช้ยาในหญิงตั้งครรภ์' },
            { label: 'ข้อมูลการใช้ยาในหญิงให้นมบุตร' },
          ],
        },
        { label: 'ข้อมูลยาต้านพิษ และเซรุ่มต้านพิษ (Antidotes and Antivenins) โดยศูนย์พิษวิทยารามาธิบดี', icon: 'ti-flask' },
        { label: 'Standard Protocol for Electrolyte Replacement Therapy', icon: 'ti-droplet' },
        { label: 'วิธีลง Medication Reconciliation', icon: 'ti-clipboard-check' },
      ],
    },
    { icon: 'ti-shield', label: 'BDMS Insurance', color: 'var(--color-blue-600)' },
  ],

  N_SYSTEMS: [
    { icon: 'ti-droplet', name: 'N-Sterile', desc: 'ระบบจ่ายกลาง' },
    { icon: 'ti-device-laptop', name: 'N-Smart', desc: 'ระบบบริหารข้อมูล' },
    { icon: 'ti-heartbeat', name: 'N-Health', desc: 'ระบบสุขภาพพนักงานออนไลน์' },
  ],

  ONCALL: [
    { icon: 'ti-user-circle', label: 'On Call Executive' },
    { icon: 'ti-heart-rate-monitor', label: 'On Call HEMO' },
    { icon: 'ti-flask', label: 'On Call Chemo' },
    { icon: 'ti-activity', label: 'On Call Coordinator' },
    { icon: 'ti-calendar-stats', label: 'On Call IV Nurse' },
    { icon: 'ti-calendar-event', label: 'ตาราง Palliative care' },
  ],

  NEWS: [
    { icon: 'ti-file-text', title: 'การคีย์ E-Memo', sub: 'ระบบบันทึกความคิดเห็นอิเล็กทรอนิกส์', subItems: [] },
    { icon: 'ti-file-invoice', title: 'การคัด Procurement Connect', sub: 'ระบบบริหารจัดซื้อจัดจ้างออนไลน์', subItems: [] },
    {
      icon: 'ti-ambulance', title: 'อัตราค่าบริการรถพยาบาล', sub: 'ตารางอัตราบริการรถพยาบาล 2568',
      subItems: [
        { label: 'ค่า Ambulance 3 โรงพยาบาลในภูเก็ต', href: '#' },
        { label: 'ค่า Ambulance ต่างจังหวัด', href: '#' },
        { label: 'ค่าส่งศพ', href: '#' },
        { label: 'อัตราค่าบริการรถพยาบาลฉุกเฉิน ภาคกลาง', href: '#' },
        { label: 'การคิดค่า Doctor Fee', href: '#' },
      ],
    },
    {
      icon: 'ti-first-aid-kit', title: 'Trauma Center', sub: 'แนวทางการปฏิบัติอุบัติเหตุ',
      subItems: [
        { label: 'การส่งต่อผู้ป่วยไปรับการรักษาที่สถานพยาบาลอื่นๆ', href: '#' },
        { label: 'การคัดกรองผู้ป่วย (Triage + Policy)', href: '#' },
        { label: 'แนวทางการดูแลผู้ป่วย Trauma', href: '#' },
        { label: 'Standard of Trauma care', href: '#' },
      ],
    },
  ],

PROMOS: [
  {
    name: 'Dental', tag: 'หมวด A', color: 'var(--color-navy-900)', icon: 'ti-tooth', img: promoDental,
    items: [{ label: 'ทำฟันใช้สิทธิ์ประกัน', icon: 'ti-tooth' }],
  },
  {
    name: 'Health Check Up Package', tag: 'หมวด B', color: 'var(--color-navy-900)', icon: 'ti-eye', img: promoCheckup,
    items: [
      { label: 'Additional ปี 2026-2027', icon: 'ti-clipboard-plus' },
      { label: 'Health Promotion ปี 2026-2027', icon: 'ti-heartbeat' },
    ],
  },
  {
    name: 'OPD PED Package', tag: 'หมวด B', color: 'var(--color-navy-900)', icon: 'ti-heart', img: promoPed,
    items: OPD_PED_PACKAGE_ITEMS,
  },
  {
    name: 'OPD GYN Package', tag: 'หมวด C', color: 'var(--color-coral)', icon: 'ti-stethoscope', img: promoGyn,
    items: OPD_GYN_PACKAGE_ITEMS,
  },
  {
    name: 'OPD Med Package', tag: 'หมวด D', color: 'var(--color-navy-900)', icon: 'ti-pill', img: promoMed,
    items: [{ label: 'แพ็กเกจวัคซีนสำหรับผู้ใหญ่และผู้สูงอายุ', icon: 'ti-syringe' }],
  },
],

  QUALITY: [
    { icon: 'ti-file-text', label: 'Document Mangement', warn: false },
    { icon: 'ti-award', label: 'Quality Center', warn: false },
    { icon: 'ti-printer', label: 'Print Form', warn: false },
    { icon: 'ti-briefcase', label: 'Occupational Health', warn: false },
    { icon: 'ti-alert-circle', label: 'Occurrence Online', warn: true },
    { icon: 'ti-virus', label: 'โรคติดต่อ', warn: false },
  ],

  PARTNERS: [
    {
      name: 'บัญชีรายชื่อบริษัทคู่สัญญา',
      icon: 'ti-list-details',
      href: '', file: null,
      subItems: [],
    },
    {
      name: 'รายชื่อรักษาพยาบาล',
      icon: 'ti-building-hospital',
      href: '', file: null,
      subItems: HEALTHCARE_PARTNERS,
    },
    {
      name: 'รายชื่อคลินิคพยาบาล',
      icon: 'ti-first-aid-kit',
      href: '', file: null,
      subItems: CLINIC_NURSE_PARTNERS,
    },

    {
      name: 'รายชื่อตรวจสุขภาพก่อนเข้าทำงาน',
      icon: 'ti-clipboard-check',
      href: '', file: null,
      subItems: PRE_EMPLOYMENT_HEALTH_CHECK_PARTNERS,
    },
    
    {
  name: 'รายชื่อผู้ตรวจสุขภาพประจำปี',
  icon: 'ti-report-medical',
  href: '', file: null,
  subItems: ANNUAL_HEALTH_CHECK_PARTNERS,
},
    {
      name: 'โปรแกรมบริหารจัดการคะแนนตัวแทนประกัน',
      icon: 'ti-award',
      href: '', file: null,
      subItems: [],
    },
    {
      name: 'รายชื่อบริษัทประกัน',
      icon: 'ti-shield-check',
      href: '', file: null,
      subItems: [],
    },
    {
      name: 'รายชื่อตรวจสุขภาพก่อนทำประกัน',
      icon: 'ti-heartbeat',
      href: '', file: null,
      subItems: PRE_INSURANCE_HEALTH_CHECK_PARTNERS,
    },
    {
  name: 'รายชื่อประกันกลุ่มโรงเรียน',
  icon: 'ti-school',
  href: '', file: null,
  subItems: SCHOOL_GROUP_INSURANCE_PARTNERS,
},
{
  name: 'Foreign Insurance companies',
  icon: 'ti-world',
  href: '', file: null,
  subItems: [],
},
  ],

  FINANCE_DOCS: [
    { icon: 'ti-file', text: 'คำสั่ง CEO G6 ที่ สน.ผบ. 021/2568 เรื่องการมอบหมายอำนาจดำเนินการทางการเงินของรพ.กลุ่ม 6' },
    { icon: 'ti-file', text: 'คำสั่ง CEO G6 ที่ สน.ผบ. 006/2568 เรื่องอำนาจการอนุมัติส่วนลดของบริษัทคู่สัญญา และผู้ป่วย กลุ่ม 6' },
    { icon: 'ti-table', text: 'ตารางอำนาจอนุมัติดำเนินการทางการเงิน ลวท.1 พฤษภาคม 2568' },
    { icon: 'ti-file', text: 'แนวทางการเสนอหนังสือเพื่อขออนุมัติ' },
  ],

  TEMPLATE_OPTIONS: [
    { label: 'Bangkok Siriroj presentation 1' },
    { label: 'Bangkok Siriroj presentation 2' },
    { label: 'Bangkok Siriroj presentation 3' },
    { label: 'Bangkok Siriroj presentation 4' },
  ],

  // ---------------- ตารางแพทย์ ----------------
  DOCTOR_LINKS: [
    { icon: 'ti-calendar-user', label: 'ตารางทำงานแพทย์', href: '#' },
    { icon: 'ti-stethoscope', label: 'ตารางแพทย์ Consult', href: '#' },
    { icon: 'ti-moon-stars', label: 'ตารางเวร GP นอกเวลา / ICU', href: '#' },
    { icon: 'ti-users', label: 'OUR DOCTOR', href: '#' },
    { icon: 'ti-certificate', label: 'เลขที่ใบอนุญาต-ตัวอย่างลายเซ็นแพทย์', href: '#' },
    { icon: 'ti-droplet', label: 'ตารางสลายนิ่ว', href: '#' },
    { icon: 'ti-book', label: 'คู่มือแนวทางการกำหนดค่าธรรมเนียมแพทย์ พ.ศ. 2563', href: '#' },
    { icon: 'ti-calendar-repeat', label: 'ตารางแพทย์ Consult สำรอง', href: '#' },
    { icon: 'ti-first-aid-kit', label: 'Acute pain Service', href: '#' },
    { icon: 'ti-calendar-plus', label: 'ตารางทำงานแพทย์ (สำรอง)', href: '#' },
  ],

  // ---------------- Division ----------------
  DIVISIONS: [
    {
      id: 'div-tpp',
      name: 'Third Party Payor Service',
      desc: 'ดูแลงานประสานสิทธิ์การเบิกจ่ายกับบริษัทประกันและคู่สัญญา',
      icon: 'ti-credit-card',
      gradient: ['#0C447C', '#378ADD'], img: divisionTpp,
      subItems: [
        { icon: 'ti-clipboard-list', label: 'UM Portal' },
        { icon: 'ti-file-invoice', label: 'IPS Local' },
        { icon: 'ti-plane', label: 'IPS Inter' },
        { icon: 'ti-building-hospital', label: 'Group 6 UCEP' },
        { icon: 'ti-shield-check', label: 'NHSO.UCEP' },
        { icon: 'ti-pill', label: 'Drug catalogue' },
        { icon: 'ti-file-check', label: 'PA UCEP' },
        { icon: 'ti-file-plus', label: 'NEW PA UCEP' },
        { icon: 'ti-receipt', label: 'E-claim' },
        { icon: 'ti-building-bank', label: 'KTB' },
      ],
    },
    {
      id: 'div-medical',
      name: 'ฝ่ายการแพทย์',
      desc: 'ดูแลงานบริการทางการแพทย์และตารางแพทย์ผู้ตรวจ',
      icon: 'ti-stethoscope',
      gradient: ['#712B13', '#F0997B'], img: divisionMedical,
      subItems: [{ icon: 'ti-calendar-user', label: 'Doctor Schedule' }],
    },
    {
      id: 'div-finance',
      name: 'บัญชีและการเงิน',
      desc: 'ดูแลงบประมาณ การเบิกจ่าย และระบบบัญชีขององค์กร',
      icon: 'ti-report-money',
      gradient: ['#085041', '#5DCAA5'], img: divisionFinance,
      subItems: [
        { icon: 'ti-file-spreadsheet', label: 'Capex List 2026' },
        { icon: 'ti-settings', label: 'Admin My B+' },
      ],
    },
    {
      id: 'div-it',
      name: 'ฝ่ายสารสนเทศ',
      desc: 'ดูแลระบบไอทีและให้บริการช่วยเหลือด้านเทคนิคแก่บุคลากร',
      icon: 'ti-device-desktop-analytics',
      gradient: ['#0C447C', '#378ADD'], img: divisionIt,
      subItems: [
        { icon: 'ti-headset', label: 'IT Oncall' },
        { icon: 'ti-lock-open', label: 'Reset & Unlock SAP' },
        { icon: 'ti-notes', label: 'EMR #2' },
        { icon: 'ti-user-off', label: 'Deactive People Connect' },
      ],
    },
  ],

  // ---------------- Report ----------------
  REPORTS: [
    { id: 'bsi-room', name: 'BSI Room', icon: 'ti-door', from: '#2563eb', to: '#1e3a8a', glow: '37,99,235' },
    { id: 'admin-error', name: 'Administration Error', icon: 'ti-alert-triangle', from: '#e11d48', to: '#9f1239', glow: '225,29,72' },
    { id: 'idoctor', name: 'iDoctor', icon: 'ti-stethoscope', from: '#059669', to: '#065f46', glow: '5,150,105' },
    { id: 'death-cert', name: 'Death Cert', icon: 'ti-certificate', from: '#7c3aed', to: '#4c1d95', glow: '124,58,237' },
    { id: 'bed-management', name: 'Bed Management', icon: 'ti-bed', from: '#4338ca', to: '#312e81', glow: '67,56,202' },
    { id: 'lexicomp', name: 'Lexicomp', icon: 'ti-pill', from: '#0891b2', to: '#155e75', glow: '8,145,178' },
    { id: 'uptodate', name: 'UpToDate', icon: 'ti-refresh', from: '#ea580c', to: '#9a3412', glow: '234,88,12' },
  ],

  // ---------------- ระบบ Online (Request & Services) ----------------
  REQUEST_CATEGORIES: [
    {
      id: 'request', label: 'Request', icon: 'ti-clipboard-list',
      accentFrom: '#1B3A6B', accentTo: '#2F5AA5',
      items: [
        { name: 'IT Request Service Now', icon: 'ti-headset' },
        { name: 'General Supply Management', icon: 'ti-package' }, 
        { name: 'Meeting Room Request', icon: 'ti-door' },
        { name: 'Online Media Request', icon: 'ti-device-tv' },
        { name: 'Car Management', icon: 'ti-car' },
        { name: 'Technician Request', icon: 'ti-tools' },
        { name: 'BSI Escort Request', icon: 'ti-walk' },
        { name: 'BCPM Connect', icon: 'ti-plug-connected' },
        { name: 'CIPN', icon: 'ti-brain' },
        { name: 'BDMS RequestForm', icon: 'ti-file-text' },
      ],
    },
    {
      id: 'medical', label: 'Medical', icon: 'ti-stethoscope',
      accentFrom: '#0F6E56', accentTo: '#1D9E75',
      items: [
        { name: 'iMed For test', icon: 'ti-flask' },
        { name: 'Drug Intervention', icon: 'ti-pill' },
        { name: 'HDePAC', icon: 'ti-report-medical' },
        { name: 'DMIS', icon: 'ti-database' },
        { name: 'COE Data Registry', icon: 'ti-database' },
        { name: 'Arcusair-uat', icon: 'ti-cloud' }, // ⚠️ ไม่มีในข้อมูลเดิม - เพิ่มใหม่
        { name: 'Price Estimate', icon: 'ti-calculator' },
        { name: 'Chemo Appointment', icon: 'ti-calendar-event' },
      ],
    },
    {
      id: 'hr', label: 'HR', icon: 'ti-users',
      accentFrom: '#7F5AA5', accentTo: '#9B7BC7',
      items: [
        { name: 'I-Training', icon: 'ti-school' },
        { name: 'ระบบขออัตรากำลัง Online', icon: 'ti-user-plus' },
        { name: 'FTE Dashboard', icon: 'ti-chart-bar' },
        { name: 'ManPower Dashboard', icon: 'ti-chart-bar' },
        { name: 'I-Competence', icon: 'ti-certificate' },
        { name: 'Check Employee Welfare', icon: 'ti-heart-handshake' },
        { name: 'Cardiac Arrest Dashboard', icon: 'ti-heartbeat' },
        { name: 'AMR สำหรับแพทย์', icon: 'ti-virus' },
      ],
    },
    {
      id: 'quality', label: 'Quality', icon: 'ti-shield-check',
      accentFrom: '#B9791E', accentTo: '#D9962F',
      items: [
        { name: 'Internal CSI From', icon: 'ti-clipboard-check' },
        { name: 'BDMS Quality And Patient Safety', icon: 'ti-shield-star' },
        { name: 'Safety Checklist', icon: 'ti-list-check' },
        { name: 'Dashboard E-consent', icon: 'ti-file-check' },
        { name: 'PCS Dashboard', icon: 'ti-chart-pie' },
        { name: 'IPD Waiting Time', icon: 'ti-clock-hour-4' },
        { name: 'PDPA ข้อมูลรั่วไหลเป็น "0"', icon: 'ti-lock' },
      ],
    },
    {
      id: 'other', label: 'Other', icon: 'ti-apps',
      accentFrom: '#3A5A78', accentTo: '#5B84A8',
      items: [
        { name: 'BDMS Checkup', icon: 'ti-heart-check' },
        { name: 'ACC_outstanding_Documer', icon: 'ti-file-alert' },
        { name: 'Hospital Daily Huddle', icon: 'ti-users-group' },
        { name: 'IPD Dashboard', icon: 'ti-layout-dashboard' },
        { name: 'Up To Date', icon: 'ti-refresh' },
        { name: 'Contract Management', icon: 'ti-files' },
        { name: 'Chivawattana', icon: 'ti-heart' },
        { name: 'E Health', icon: 'ti-heartbeat' },
        { name: 'Q Pharmacy & Cashier', icon: 'ti-cash-banknote' },
        { name: 'Password Reset', icon: 'ti-key' },
        { name: 'BSI ECUPON', icon: 'ti-ticket' },
        { name: 'DeeSMS', icon: 'ti-message-2' },
        { name: 'BDMS eMemo', icon: 'ti-mail' },
        { name: 'Breast Implant', icon: 'ti-first-aid-kit' },
        { name: 'Q Pharmacy Dashboard', icon: 'ti-chart-bar' },
        { name: 'Reserve Room Monitor', icon: 'ti-video' },
      ],
    },
  ],
}