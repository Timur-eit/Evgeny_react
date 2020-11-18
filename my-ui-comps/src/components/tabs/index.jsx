// import React, { useState } from 'react';
// import { tabsData } from './tabsData'
// import './style.css';

// const tabs = [...tabsData];

// // console.log(tabsData);

// function TabButton({ name, tabNumberChanger }) {
//   return (
//     <button onClick={tabNumberChanger}>{name}</button>
//   )
// };

// export function Tab() {
//   const [tabIndex, setTabIndex] = useState(0);

//   let content = tabs[tabIndex].content;

//   return (
//     <div className='tabs'>
//       <div className='tabs__buttons'>
//         {tabs.map((item, i) => {
//           return <TabButton key={i} name={item.buttonName} tabNumberChanger={() => setTabIndex(i)} />
//         })}
//       </div>
//       <div className='tabs__content-box'>
//         {content}
//       </div>
//     </div>
//   )
// }