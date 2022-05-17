import React from "react";

import { CopyBlock, dracula } from "react-code-blocks";
import { Panel, PanelGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import SNIPPETS, { themes } from "../constants";

function Snippets() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ alignSelf: "center", margin: 20 }}>Saved Snippets</h1>
      <div
        style={{ paddingLeft: "20%", paddingRight: "20%", marginBottom: "30%" }}
      >
        <PanelGroup accordion bordered>
          <Panel header="JSX" defaultExpanded>
            <CopyBlock
              language="jsx"
              text={SNIPPETS.jsx}
              showLineNumbers
              theme="dracula"
              wrapLines={true}
              codeBlock
            />
          </Panel>
          <Panel header="CPP">
            <CopyBlock
              language="jsx"
              text={SNIPPETS.cpp}
              showLineNumbers
              theme={themes.codepen}
              wrapLines={true}
              codeBlock
            />
          </Panel>
          <Panel header="JAVA">
            <CopyBlock
              language="jsx"
              text={SNIPPETS.java}
              showLineNumbers
              theme={themes.dracula}
              wrapLines={true}
              codeBlock
            />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default Snippets;
