import Link from 'next/link'
import FooterNewsletter from './FooterNewsletter'

const footerLinks = {
  Collection: [
    { label: 'Menswear', href: '/tier-1/shop?category=Menswear' },
    { label: 'Womenswear', href: '/tier-1/shop?category=Womenswear' },
    { label: 'Accessories', href: '/tier-1/shop?category=Accessories' },
    { label: 'New Arrivals', href: '/tier-1/shop?sort=newest' },
    { label: 'Sale', href: '/tier-1/shop?sale=true' },
  ],
  'Client Services': [
    { label: 'Sizing Guide', href: '/tier-1/contact#sizing' },
    { label: 'Shipping & Delivery', href: '/tier-1/contact#shipping' },
    { label: 'Returns & Exchanges', href: '/tier-1/contact#returns' },
    { label: 'Care Instructions', href: '/tier-1/contact#care' },
    { label: 'Contact Us', href: '/tier-1/contact' },
  ],
  Company: [
    { label: 'Heritage', href: '/tier-1/heritage' },
    { label: 'Craftsmanship', href: '/tier-1/heritage#craft' },
    { label: 'Sustainability', href: '/tier-1/heritage#sustainability' },
    { label: 'Careers', href: '/tier-1/heritage#careers' },
    { label: 'Press', href: '/tier-1/heritage#press' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/tier-1' },
    { label: 'Terms of Service', href: '/tier-1' },
    { label: 'Cookie Policy', href: '/tier-1' },
    { label: 'Accessibility', href: '/tier-1' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-black text-cream">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-widest text-cream hover:text-cream-dark transition-colors">
              ABYSS
            </Link>
            <p className="font-sans text-xs text-cream/50 mt-4 leading-relaxed tracking-wide max-w-xs">
              Where heritage meets restraint. Established in the tradition of European old money, for those who understand that true luxury whispers.
            </p>
            {/* Socials */}
            <div className="flex gap-4 mt-6">
              {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                <button
                  key={social}
                  aria-label={social}
                  className="w-8 h-8 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-cream/60 hover:text-cream transition-all duration-300"
                >
                  <span className="font-sans text-[9px] tracking-widest">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-sans text-[10px] tracking-luxury uppercase text-cream/40 mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-xs text-cream/70 hover:text-cream transition-colors tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-luxury uppercase text-cream/40 mb-1">
              The Inner Circle
            </p>
            <p className="font-serif text-lg text-cream">
              Exclusive access. Priority allocations. Private events.
            </p>
          </div>
          <FooterNewsletter />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 px-6 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[10px] text-cream/30 tracking-wide">
            © {new Date().getFullYear()} ABYSS. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-sans text-[10px] text-cream/30 tracking-wide">
              Secure payments · Discreet packaging · Worldwide delivery
            </p>
            <div className="flex items-center gap-2">
              {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((card) => (
                <span
                  key={card}
                  className="font-sans text-[8px] tracking-widest text-cream/30 border border-cream/15 px-1.5 py-0.5"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
