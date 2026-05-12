import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  const logoPath = path.join(
    process.cwd(),
    "public/logo/parkour_logo_simple.png",
  );
  const logoData = fs.readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={155} height={175} alt="" />
      </div>
    ),
    { ...size },
  );
}
