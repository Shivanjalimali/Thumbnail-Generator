import SoftBackdrop from "../components/SoftBackdrop";

const About = () => {
    return (
        <>
            <SoftBackdrop />
            <div className="pt-24 min-h-screen text-white">
                <div className="max-w-6xl mx-auto p-6 rounded-2xl bg-white/8 border-white/12 shadow-xl space-y-5 ">

                    {/* Heading */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold">
                            About
                        </h1>

                        <h2 className="text-4xl font-bold text-pink-500 mt-2">
                            ThumbnailGo
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">

                        {/* LEFT SIDE */}
                        <div className="space-y-6 text-zinc-300 leading-relaxed">
                            <p>
                                ThumbnailGo is an AI powered thumbnail generator which helps creators
                                quickly design eye-catching, high CTR thumbnails for YouTube videos,
                                blogs and social media posts.
                            </p>

                            <p>
                                Its smart thumbnail creator and analysis tool produces vibrant and
                                optimized thumbnails to boost views and engagement.
                            </p>

                            <p>
                                Users can generate professional results in a few seconds, making designs
                                stand out and attract more clicks.
                            </p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
                            <h3 className="text-2xl font-semibold mb-6">
                                Why Choose Us?
                            </h3>

                            <div className="space-y-6">

                                <div>
                                    <h4 className="font-semibold">⚡ Lightning Fast</h4>
                                    <p className="text-zinc-400 text-sm">
                                        Generate professional thumbnails in seconds
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">✨ AI Powered</h4>
                                    <p className="text-zinc-400 text-sm">
                                        Using state-of-the-art AI to optimize for clicks.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">🎨 Fully Customizable</h4>
                                    <p className="text-zinc-400 text-sm">
                                        Edit every detail to match your brand’s unique style.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* Footer section */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h4 className="font-semibold mb-2">
                                Built for Small Channels
                            </h4>
                            <p className="text-zinc-400 text-sm">
                                Made for solo YouTubers doing everything themselves — no designer,
                                no team, no complicated tools.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 ">
                            <h4 className="font-semibold mb-2">
                                Thumbnails Without Design Skills
                            </h4>
                            <p className="text-zinc-400">
                                Describe your video and let AI generate thumbnails you can tweak in minutes, even if you've never designed before.
                            </p>
                        </div>
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6 ">
                            <h4 className="font-semibold mb-2">
                                Stop Losing Clicks
                            </h4>
                            <p className="text-zinc-400">
                                Create better looking thumbnails fast so your videos don't get ignored - even with a small audience.                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default About;