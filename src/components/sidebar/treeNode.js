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
      case 'monsters': // system
        items[0] = { items:[], label: 'resonance', title: 'Resonance', url: '/system/resonance'};
        items[1] = { items:[], label: 'synthesis-runes', title: 'Runes', url: '/system/synthesis-runes'};
        items[2] = { items:[], label: 'monsters', title: 'Monsters', url: '/system/monsters'};
        items[3] = { items:[], label: 'traps', title: 'Traps', url: '/system/traps'};
        break;
      case 'ancient-ruins': // dungeons
        items[0] = { items:[], label: 'ancient-ruins', title: 'Ancient Ruins', url: '/dungeons/ancient-ruins'};
        items[1] = { items:[], label: 'castle-tower', title: 'Castle Tower', url: '/dungeons/castle-tower'};
        items[2] = { items:[], label: 'castle-keep', title: 'Castle Keep', url: '/dungeons/castle-keep'};
        items[3] = { items:[], label: 'jahannams-gate', title: 'Jahannam', url: '/dungeons/jahannams-gate'};
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
