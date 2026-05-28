"use client";

import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

const C = {
  bg:        "#030d07",
  green:     "#16a34a",
  greenDark: "#14532d",
  greenMid:  "#22c55e",
  text:      "#1c3a1c",
  body:      "#374151",
  muted:     "#6b7280",
  border:    "#d1fae5",
};

/* ── Section block ── */
function Section({ title, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10"
    >
      {title && (
        <h2 className="font-bold text-[17px] md:text-[19px] mb-3 flex items-center gap-2"
          style={{ color: C.green }}>
          <span className="w-1 h-5 rounded-full inline-block" style={{ background: C.greenMid }} />
          {title}
        </h2>
      )}
      <div className="text-[14px] md:text-[15px] leading-relaxed space-y-3" style={{ color: "#374151" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── List item ── */
function Li({ children }) {
  return (
    <li className="flex gap-2.5 items-start">
      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: C.greenMid }} />
      <span>{children}</span>
    </li>
  );
}

export default function DisclaimerClient() {
  return (
    <div style={{ background: "#f8fef8", minHeight: "100vh" }}>

      {/* Animated background blobs */}
      {[
        { top: "-8%",  left: "-4%",  size: 500, color: C.greenMid, dur: 16 },
        { top: "40%",  left: "72%",  size: 420, color: "#6366f1",  dur: 22 },
        { top: "75%",  left: "4%",   size: 380, color: C.green,    dur: 18 },
      ].map((b, i) => (
        <motion.div key={i}
          animate={{ x: [0, 20*(i%2===0?1:-1), -15, 0], y: [0, -18*(i%2===0?1:-1), 14, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          style={{ position: "fixed", top: b.top, left: b.left, width: b.size, height: b.size,
            borderRadius: "50%", background: b.color, opacity: 0.04, filter: "blur(80px)",
            pointerEvents: "none", zIndex: 0 }}
        />
      ))}

      <NavBar activePage="disclaimer" />

      {/* ── HERO ── */}
      <section className="relative z-10 pt-28 pb-16 px-6 lg:px-10 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050a1a 0%, #071a0e 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: C.greenMid }}>
              Legal · Disclaimer &amp; Privacy
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ background: "linear-gradient(90deg, #86efac, #22c55e, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ನಿರಾಕರಣೆ ಮತ್ತು ಗೋಪ್ಯತಾ ನೀತಿ
          </motion.h1>

          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-bold text-xl md:text-2xl text-white mb-4">
            Disclaimer &amp; Privacy Policy
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Bengaluru Metro City Infrastructure Housing Co-operative Society LTD
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="relative z-10 py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">

          {/* Card wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-8 md:p-12"
            style={{ background: "#ffffff", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid #e5f5e9" }}
          >

            {/* Company name header */}
            <div className="mb-10 pb-8" style={{ borderBottom: "1px solid #d1fae5" }}>
              <h2 className="font-extrabold text-2xl md:text-3xl mb-1" style={{ color: C.green }}>
                Bengaluru Metro City Infrastructure Housing
              </h2>
              <p className="font-semibold text-lg" style={{ color: C.text }}>
                Co-operative Society LTD
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} className="w-4 h-4 shrink-0">
                  <circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                </svg>
                <span className="text-[12px] font-semibold" style={{ color: C.greenDark }}>
                  Reg No. JRB/RGN/CR-13/51578/2022-23
                </span>
              </div>
            </div>

            {/* Governing Law */}
            <Section title="Governing Law & Legal Authorization" delay={0.05}>
              <p>
                <strong>Bengaluru Metro City Infrastructure Housing Co-operative Society LTD</strong> is a duly registered housing
                co-operative society under the <strong>Karnataka Co-operative Societies Act, 1959</strong>, recognized and regulated by
                the Government of Karnataka. The Society is registered under Registration No:{" "}
                <strong>JRB/RGN/CR-13/51578/2022-23</strong>.
              </p>
              <p>
                The Society is legally authorized to acquire land, develop residential layouts, and allot plots to its members in
                accordance with its registered bye-laws and applicable state laws. All residential layouts promoted and sold by the
                Society are duly approved by the competent development authorities, including{" "}
                <strong>BIAAPA (Bangalore International Airport Area Planning Authority)</strong> and carry valid{" "}
                <strong>&apos;A&apos; Khata</strong> certification, confirming clear title and compliance with local planning
                regulations.
              </p>
              <p>
                All transactions, advertisements, bookings, and allotments are carried out strictly within the framework of the
                Karnataka Co-operative Societies Act, the Real Estate (Regulation and Development) Act, 2016 (RERA), and other
                applicable laws. Payments are accepted only through official banking channels — Cheque, RTGS, NEFT, or IMPS. No
                cash dealings are permitted.
              </p>
            </Section>

            {/* Divider */}
            <div className="my-8 h-px" style={{ background: "#d1fae5" }} />

            {/* Interpretation */}
            <Section title="Interpretation and Definitions" delay={0.1}>
              <p className="font-semibold" style={{ color: C.text }}>Interpretation</p>
              <p>
                The words of which the initial letter is capitalized have meanings defined under the following conditions.
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
            </Section>

            {/* Definitions */}
            <Section title="Definitions" delay={0.12}>
              <ul className="space-y-3 list-none">
                <Li><span><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Bengaluru Metro City Infrastructure Housing Co-operative Society LTD.</span></Li>
                <Li><span><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</span></Li>
                <Li><span><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</span></Li>
                <Li><span><strong>Service</strong> refers to the advertisement, website, or application.</span></Li>
                <Li><span><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</span></Li>
                <Li><span><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</span></Li>
                <Li><span><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</span></Li>
              </ul>
            </Section>

            <div className="my-8 h-px" style={{ background: "#d1fae5" }} />

            {/* Collecting Data */}
            <Section title="Collecting and Using Your Personal Data" delay={0.14}>
              <p className="font-semibold" style={{ color: C.text }}>Types of Data Collected — Personal Data</p>
              <p>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that
                can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="space-y-2 list-none mt-2">
                <Li>First name and last name</Li>
                <Li>Email address</Li>
                <Li>Phone number</Li>
                <Li>Location details such as your address, city, or country</Li>
                <Li>Any other data such as personal preferences, requirements, or comments</Li>
              </ul>
            </Section>

            {/* Use of Data */}
            <Section title="Use of Your Personal Data" delay={0.16}>
              <p>The Company may use Personal Data for the following purposes:</p>
              <ul className="space-y-2 list-none mt-2">
                <Li>To provide and maintain our Service, including to monitor the usage of our Service.</Li>
                <Li>To manage Your Account: to manage Your registration as a user of the Service.</Li>
                <Li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</Li>
                <Li>To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication regarding updates or informative communications related to the functionalities, products or contracted services.</Li>
                <Li>To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about.</Li>
                <Li>To manage Your requests: To attend and manage Your requests to Us.</Li>
                <Li>For other purposes: data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service.</Li>
              </ul>

              <p className="mt-4">We may share Your personal information in the following situations:</p>
              <ul className="space-y-2 list-none mt-2">
                <Li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</Li>
                <Li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition.</Li>
                <Li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</Li>
              </ul>
            </Section>

            <div className="my-8 h-px" style={{ background: "#d1fae5" }} />

            {/* Retention */}
            <Section title="Retention of Your Personal Data" delay={0.18}>
              <p>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this
                Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal
                obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis purposes.
              </p>
            </Section>

            {/* Transfer */}
            <Section title="Transfer of Your Personal Data" delay={0.2}>
              <p>
                Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any
                other places where the parties involved in the processing are located. It means that this information may
                be transferred to — and maintained on — computers located outside of Your state, province, country or other
                governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement
                to that transfer. The Company will take all steps reasonably necessary to ensure that Your data is treated
                securely and in accordance with this Privacy Policy.
              </p>
            </Section>

            <div className="my-8 h-px" style={{ background: "#d1fae5" }} />

            {/* Disclosure */}
            <Section title="Disclosure of Your Personal Data" delay={0.22}>
              <p className="font-semibold" style={{ color: C.text }}>Law Enforcement</p>
              <p>
                Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so
                by law or in response to valid requests by public authorities (e.g. a court or a government agency).
              </p>
              <p className="font-semibold mt-4" style={{ color: C.text }}>Other Legal Requirements</p>
              <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
              <ul className="space-y-2 list-none mt-2">
                <Li>Comply with a legal obligation</Li>
                <Li>Protect and defend the rights or property of the Company</Li>
                <Li>Prevent or investigate possible wrongdoing in connection with the Service</Li>
                <Li>Protect the personal safety of Users of the Service or the public</Li>
                <Li>Protect against legal liability</Li>
              </ul>
            </Section>

            {/* Security */}
            <Section title="Security of Your Personal Data" delay={0.24}>
              <p>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over
                the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable
                means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </Section>

            <div className="my-8 h-px" style={{ background: "#d1fae5" }} />

            {/* Links */}
            <Section title="Links to Other Websites" delay={0.26}>
              <p>
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party
                link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy
                Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the content, privacy policies or practices of any
                third party sites or services.
              </p>
            </Section>

            {/* Changes */}
            <Section title="Changes to This Privacy Policy" delay={0.28}>
              <p>
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
                Privacy Policy on this page.
              </p>
            </Section>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 pt-8 flex flex-wrap items-center justify-between gap-4"
              style={{ borderTop: "1px solid #d1fae5" }}
            >
              <div className="text-[12px]" style={{ color: C.muted }}>
                Last updated: January 2025 · Bengaluru Metro City Infrastructure Housing Co-operative Society LTD
              </div>
              <motion.a href="/"
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                ← Back to Home
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
