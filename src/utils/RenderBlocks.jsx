import React from "react";
import { blocks } from "@/blocks/blocklist";

export default function RenderBlocks({ layout }) {
  return (
    <div>
      {layout.map((block, i) => {
        const Block = blocks[block.blockType];
        if (Block) {
          return <Block key={i} {...block} />;
        }
        return null;
      })}
    </div>
  );
}
