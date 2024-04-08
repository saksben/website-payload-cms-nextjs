import RichTextParser from "@/utils/RichTextParser";
import React from "react";

export default function SimpleRichText({ body }) {
  return (
    <div className="py-10 px-6">
      <RichTextParser content={body} />
    </div>
  );
}
