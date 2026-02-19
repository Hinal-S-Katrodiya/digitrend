const images = [
  {
    url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80",
    label: "Animals",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    label: "Geography",
  },
  {
    url: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=400&q=80",
    label: "History",
  },
  {
    url: "https://images.unsplash.com/photo-1493210977493-3ba2d8a29fd0?w=400&q=80",
    label: "Entertainment",
  },
  {
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    label: "Space",
  },
   {
    url: "https://images.unsplash.com/photo-1493210977493-3ba2d8a29fd0?w=400&q=80",
    label: "Entertainment",
  },
  {
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    label: "Space",
  }
];

const ROPE_PATH =
  "M 0,60 Q 250,140 500,140 Q 750,140 1000,60";


const CARD_WIDTH = 150;
const CARD_HEIGHT = 160;
const STRING_LENGTH = 20;

export default function HangingImages() {
  return (
    <>
      <div className="mt-9 mb-7">
     <div className="text-center  ">
        <h2 className=" text-5xl md:text-7xl font-bold text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">Trusted by businesses worldwide</p>
      </div>
    <div
      style={{
        width: "100%",
        
        overflow: "hidden",
        padding: "0px 0",
      }}
    >
      <svg
        viewBox="0 0 1000 320"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%" }}
      >
        {/* Rope */}
        <path
          id="ropePath"
          d={ROPE_PATH}
          stroke="#8B6914"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {images.map((img, i) => (
          <g key={i}>
            <g>
              {/* String */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={STRING_LENGTH}
                stroke="#8B6914"
                strokeWidth="2"
              />

              {/* Green Pin */}
              <circle cx="0" cy="0" r="6" fill="#22a553" />
              <circle cx="0" cy="0" r="2.5" fill="#fff" />

              {/* Card */}
              <g transform={`translate(${-CARD_WIDTH / 2}, ${STRING_LENGTH})`}>
                <rect
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                  rx="14"
                  fill="white"
                  stroke="#ddd"
                />

                <image
                  href={img.url}
                  x="8"
                  y="8"
                  width={CARD_WIDTH - 16}
                  height={CARD_HEIGHT - 45}
                  preserveAspectRatio="xMidYMid slice"
                />

                <text
                  x={CARD_WIDTH / 2}
                  y={CARD_HEIGHT - 12}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#222"
                >
                  {img.label}
                </text>
              </g>

              {/* PERFECT Motion Along Rope */}
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                rotate="auto"
                begin={`${i * 3}s`}
              >
                <mpath href="#ropePath" />
              </animateMotion>
            </g>
          </g>
        ))}
      </svg>
      </div>
      </div>
      </>
  );
}
