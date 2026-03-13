import SoftBackdrop from "../components/SoftBackdrop";
export default function Contact() {
  return (
    <>
    <SoftBackdrop/>
    <div className="pt-28 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-zinc-400 mt-3">
            Have questions, suggestions, or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition font-medium"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

              <div className="space-y-3 text-zinc-300">
                <p>📧 Email: alphacoder@thumbnailgo.com</p>
                <p>📍 Location: India</p>
                <p>⏱ Response Time: Within 24 hours</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>

              <div className="flex gap-4">

                <a
                  href="#"
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  GitHub
                </a>

                <a
                  href="#"
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  Twitter
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
    </>
  );
}