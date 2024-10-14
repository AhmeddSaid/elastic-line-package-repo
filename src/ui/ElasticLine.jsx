import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ElasticLine = ({
  bendFactor = 1,
  bendSpeed = 0.2,
  tension = 2,
  proximityZone = 50,
  text = "Bending Line Bending Text",
  lineColor = "#292929",
  textColor = "#0003b9",
  textAlign = "center",
  fontSize = 42,
  fontWeight = 400,
  fontFamily = "impact",
  strokeSize = 3,
  height = "200px",
  width = "90%",
}) => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const textPath = textRef.current;

    let e = 0;

    // Function to dynamically calculate the Y position of the line based on container height
    const getLineY = () => container.offsetHeight / 2;

    // Function to dynamically get the SVG path with optional control points
    const getPathD = (
      t = container.offsetWidth / 2,
      e = getLineY(),
      n = container.offsetWidth,
    ) => {
      return `M0,${getLineY()} Q${t},${e} ${n},${getLineY()}`;
    };

    // Function to clamp the bending height within the container's height
    const clampBendingHeight = (bendingHeight, containerHeight) => {
      return Math.max(0, Math.min(bendingHeight, containerHeight));
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = event.pageX - rect.left;
      const mouseY = event.pageY - rect.top;
      const lineY = getLineY(); // Get the updated line Y position

      // Only bend if the mouse is within the proximity zone of the line
      if (Math.abs(mouseY - lineY) > proximityZone) {
        return;
      }

      // Get the container's height
      const containerHeight = container.offsetHeight;

      // Determine initial bend offset based on mouse position
      e = e || (mouseY < lineY ? 50 : -50);

      // Calculate the bending height with the factor applied, and clamp it within container height
      const s = mouseX;
      let bendingHeight = bendFactor * (2 * mouseY - lineY + e);
      bendingHeight = clampBendingHeight(bendingHeight, containerHeight);

      // Animate the path curve with clamped bending height
      gsap.to(path, {
        attr: { d: getPathD(s, bendingHeight) },
        duration: bendSpeed,
        overwrite: true,
      });

      // Move the text along with the path
      gsap.to(textPath, {
        attr: { d: getPathD(s, bendingHeight) },
        duration: bendSpeed,
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      e = 0; // Reset the bending effect on mouse leave

      // Reset the path to its original straight form
      gsap.to(path, {
        attr: { d: getPathD() },
        duration: tension,
        ease: "elastic.out(1, 0.2)", // Physics-like elastic return
      });

      // Reset the text position
      gsap.to(textPath, {
        attr: { d: getPathD() },
        duration: tension,
        ease: "elastic.out(1, 0.2)",
      });
    };

    // Set up event listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Function to reset the path on container resize
    const updatePath = () => {
      gsap.killTweensOf(path); // Stop any running animations
      path.setAttribute("d", getPathD()); // Reset the path to its initial state
      textPath.setAttribute("d", getPathD()); // Reset the text to its initial state
    };

    // Handle resizing of the container
    const resizeObserver = new ResizeObserver(updatePath);
    resizeObserver.observe(container);

    // Cleanup on component unmount
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [bendFactor, bendSpeed, tension, proximityZone, text]);

  return (
    <div className={`mt-20 flex`} style={{ width: width, margin: "auto" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: height,
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            overflow: "visible",
          }}
        >
          <path
            ref={pathRef}
            id="line" // Added ID for the path
            d="M0,100 Q380.5,100 761,100"
            stroke={lineColor}
            strokeWidth={strokeSize}
            fill="transparent"
          />
          <text
            textAnchor="middle"
            fill={textColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
            style={{ fontWeight: fontWeight, cursor: "default" }}
          >
            <textPath
              ref={textRef}
              href="#line"
              startOffset={
                (textAlign === "left" && "0%") ||
                (textAlign === "center" && "50%") ||
                (textAlign === "right" && "100%")
              }
            >
              {text}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ElasticLine;
