// modules/debug.js
// Full internal debug console for QuakeMonitor

(function() {
  // Create debug panel
  const panel = document.createElement("div");
  panel.id = "debug-panel";
  panel.style.position = "fixed";
  panel.style.bottom = "0";
  panel.style.left = "0";
  panel.style.width = "100%";
  panel.style.maxHeight = "30vh";
  panel.style.overflowY = "auto";
  panel.style.background = "rgba(0,0,0,0.75)";
  panel.style.color = "#0ff";
  panel.style.fontSize = "12px";
  panel.style.padding = "8px";
  panel.style.borderTop = "1px solid #0ff";
  panel.style.fontFamily = "monospace";
  panel.style.zIndex = "9999";
  panel.style.whiteSpace = "pre-wrap";
  document.body.appendChild(panel);

  // Global debug() function
  window.debug = function(msg, obj = null) {
    const line = document.createElement("div");
    const time = new Date().toLocaleTimeString();
    line.textContent = `[${time}] ${msg}`;

    if (obj !== null) {
      try {
        line.textContent += " " + JSON.stringify(obj);
      } catch {
        line.textContent += " [object]";
      }
    }

    panel.appendChild(line);
    panel.scrollTop = panel.scrollHeight;
  };

  // Add clear button
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "CLEAR DEBUG";
  clearBtn.style.position = "fixed";
  clearBtn.style.bottom = "32vh";
  clearBtn.style.right = "10px";
  clearBtn.style.zIndex = "9999";
  clearBtn.style.background = "#0ff";
  clearBtn.style.color = "#000";
  clearBtn.style.border = "none";
  clearBtn.style.padding = "6px 10px";
  clearBtn.style.fontSize = "12px";
  clearBtn.style.borderRadius = "4px";
  clearBtn.onclick = () => panel.innerHTML = "";
  document.body.appendChild(clearBtn);

})();
