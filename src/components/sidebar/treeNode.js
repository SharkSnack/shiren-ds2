import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, items, ...rest }) => {
  const isCollapsed = collapsed[url];

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  // crappy hardcoded fix to change sidebar item order and titles
  if (hasChildren) {
    switch (items[0].label) {
      case 'blank-scroll-guide': // guides
        items[0] = { items:[], label: 'blank-scroll-guide', title: 'Blank Scroll', url: '/guides/blank-scroll-guide'};
        items[1] = { items:[], label: 'identifying-items', title: 'Identification', url: '/guides/identifying-items'};
        items[2] = { items:[], label: 'tips-and-tricks', title: 'Tips & Tricks', url: '/guides/tips-and-tricks'};
        items[3] = { items:[], label: 'rescue-passwords', title: 'Passwords', url: '/guides/rescue-passwords'};
        break;
      case 'bracelets': // items
        items[0] = { items:[], label: 'price-chart', title: 'Price Chart', url: '/items/price-chart'};
        items[1] = { items:[], label: 'weapons', title: 'Weapons', url: '/items/weapons'};
        items[2] = { items:[], label: 'shields', title: 'Shields', url: '/items/shields'};
        items[3] = { items:[], label: 'bracelets', title: 'Bracelets', url: '/items/bracelets'};
        items[4] = { items:[], label: 'grass', title: 'Grass', url: '/items/grass'};
        items[5] = { items:[], label: 'staves', title: 'Staves', url: '/items/staves'};
        items[6] = { items:[], label: 'scrolls', title: 'Scrolls', url: '/items/scrolls'};
        items[7] = { items:[], label: 'pots', title: 'Pots', url: '/items/pots'};
        items[8] = { items:[], label: 'food', title: 'Food', url: '/items/food'};
        items[9] = { items:[], label: 'monster-meat', title: 'Meat', url: '/items/monster-meat'};
        items[10] = { items:[], label: 'projectiles', title: 'Projectiles', url: '/items/projectiles'};
        break;
      case 'adventure-footprints': // system
        items[0] = { items:[], label: 'resonance', title: 'Resonance', url: '/system/resonance'};
        items[1] = { items:[], label: 'synthesis-runes', title: 'Runes', url: '/system/synthesis-runes'};
        items[2] = { items:[], label: 'monsters', title: 'Monsters', url: '/system/monsters'};
        items[3] = { items:[], label: 'traps', title: 'Traps', url: '/system/traps'};
        items[4] = { items:[], label: 'allies', title: 'Allies', url: '/system/allies'};
        items[5] = { items:[], label: 'status-conditions', title: 'Status', url: '/system/status-conditions'};
        items[6] = { items:[], label: 'training-facility', title: 'Training', url: '/system/training-facility'};
        items[7] = { items:[], label: 'adventure-footprints', title: 'Footprints', url: '/system/adventure-footprints'};
        break;
      case 'abyssal-depths': // dungeons
        items[0] = { items:[], label: 'ancient-ruins', title: 'Ancient Ruins', url: '/dungeons/ancient-ruins'};
        items[1] = { items:[], label: 'castle-tower', title: 'Castle Tower', url: '/dungeons/castle-tower'};
        items[2] = { items:[], label: 'castle-keep', title: 'Castle Keep', url: '/dungeons/castle-keep'};
        items[3] = { items:[], label: 'jahannams-gate', title: 'Jahannam', url: '/dungeons/jahannams-gate'};
        items[4] = { items:[], label: 'tonfans-hole', title: 'Tonfan\'s Hole', url: '/dungeons/tonfans-hole'};
        items[5] = { items:[], label: 'wanado-tournament', title: 'Wanado', url: '/dungeons/wanado-tournament'};
        items[6] = { items:[], label: 'pot-cave', title: 'Pot Cave', url: '/dungeons/pot-cave'};
        items[7] = { items:[], label: 'abyssal-depths', title: 'Abyss Depths', url: '/dungeons/abyssal-depths'};
        items[8] = { items:[], label: 'smiths-forge', title: 'Smith\'s Forge', url: '/dungeons/smiths-forge'};
        items[9] = { items:[], label: 'mamel-cave', title: 'Mamel Cave', url: '/dungeons/mamel-cave'};
        items[10] = { items:[], label: 'inner-ruins', title: 'Inner Ruins', url: '/dungeons/inner-ruins'};
        items[11] = { items:[], label: 'obabas-hidden-hole', title: 'Obaba\'s Hole', url: '/dungeons/obabas-hidden-hole'};
        break;
      default:
        // do nothing
    }
  }

  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url}>
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
