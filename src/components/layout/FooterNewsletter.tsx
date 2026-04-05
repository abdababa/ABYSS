'use client'

export default function FooterNewsletter() {
  return (
    <form className="flex gap-0 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-5 py-3 bg-cream/5 border border-cream/20 text-cream text-xs font-sans placeholder:text-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-burgundy text-cream font-sans text-xs tracking-luxury uppercase hover:bg-burgundy-dark transition-colors whitespace-nowrap"
      >
        Join
      </button>
    </form>
  )
}
