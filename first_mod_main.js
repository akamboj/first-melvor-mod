// ==UserScript==
// @name        first mod
// @description 
// @version     0.1.0
// @match       https://*.melvoridle.com/*
// @exclude     https://wiki.melvoridle.com*
// @grant       none
// @namespace   akamboj/first-melvor-mod
// ==/UserScript==

(() => {
    const main = () => {
      const respawnTime = player.getMonsterSpawnTime() - 100;
      player.passives.set({ modifiers: { decreasedMonsterRespawnTimer: respawnTime }}, { save: false, display: false });
      updateAllPlayerModifiers();
    };
  
    const load = () => {
      const isGameLoaded = (window.isLoaded && !window.currentlyCatchingUp) ||
        (typeof unsafeWindow !== 'undefined' && unsafeWindow.isLoaded && !unsafeWindow.currentlyCatchingUp);
        
      if (!isGameLoaded) {
        setTimeout(load, 50);
        return;
      }
  
      inject();
    };
  
    const inject = () => {
        const script = document.createElement('script');
        script.textContent = `try { (${main})(); } catch (e) { console.error(e); }`;
  
        document.body.appendChild(script);
    };
  
    load();
  })();