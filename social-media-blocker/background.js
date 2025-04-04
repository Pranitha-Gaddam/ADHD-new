const blockedSites = [
    "*://*.facebook.com/*",
    "*://*.twitter.com/*",
    "*://*.instagram.com/*",
    "*://*.tiktok.com/*",
    "*://*.linkedin.com/*"
  ];
  
  // Function to update rules dynamically
  const updateRules = (enable) => {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: blockedSites.map((_, i) => i + 1), // Remove existing rules
        addRules: enable
          ? blockedSites.map((url, id) => ({
              id: id + 1,
              priority: 1,
              action: {
                type: "redirect",
                redirect: { url: chrome.runtime.getURL("error.html") } // Redirect to error.html
              },
              condition: { urlFilter: url, resourceTypes: ["main_frame"] }
            }))
          : [] // If disabling, don't add new rules
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error updating rules:", chrome.runtime.lastError.message);
        } else {
          console.log(enable ? "Blocking rules applied." : "Blocking rules removed.");
        }
      }
    );
  };
  
  // Listener for React messages
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.block !== undefined) {
      console.log(`Focus Mode status: ${message.block ? "Enabled" : "Disabled"}`);
      updateRules(message.block); // Enable or disable blocking rules
      sendResponse({ status: "Focus Mode updated successfully." });
    } else {
      sendResponse({ status: "Invalid message." });
    }
    return true; // Keep the message channel open for async responses
  });
