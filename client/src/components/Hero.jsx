import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section id="home" className="section">
      <div className="container grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
        <div>
          <motion.h1
            className="text-[clamp(32px,4.2vw,56px)] leading-tight font-extrabold text-white text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typewriter
              words={["We build, launch, and grow your digital presence"]}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />{" "}
          </motion.h1>
          <p className="text-muted mt-2">
            Website building & hosting • Social media handling • Digital
            marketing
          </p>
          <div className="flex gap-3 my-4">
            <a href="#contact" className="btn btn-primary">
              Get a free quote
            </a>
            <a href="#work" className="btn">
              See our work
            </a>
          </div>
          <ul className="flex flex-wrap gap-2 text-muted">
            {[
              "MERN",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "MongoDB",
            ].map((x) => (
              <li
                key={x}
                className="px-2.5 py-1 rounded-full border border-border text-sm"
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className=" text-center text-3xl font-bold tracking-wide text-white mb-4">
            Latest Work
          </h1>
          <div
            aria-hidden
            className="h-80 rounded-[14px] border border-border bg-gradient-to-b from-white/5 to-white/0 relative overflow-hidden"
          >
            <video
              src="/RMH.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
