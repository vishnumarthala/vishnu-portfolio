export const PROFILE_KEY = "vm-profile";
export const PROFILE_IDS = ["ai", "hiring", "browse"] as const;

/**
 * Runs before first paint: applies a stored profile, or opens the profile gate on a first visit.
 * Kept tiny and dependency-free because it is inlined into the document head.
 */
export const profileBootScript = `(function(){try{var d=document.documentElement,p=localStorage.getItem("${PROFILE_KEY}");if(p&&${JSON.stringify(PROFILE_IDS)}.indexOf(p)>-1){d.dataset.profile=p}else{d.dataset.gate="open"}}catch(e){}})();`;
