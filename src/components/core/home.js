import React from "react";
// /** @jsx jsx */ import { jsx } from "@emotion/core";
// import { Link } from "gatsby";
// import styled from "@emotion/styled";
// import { LiveChatLogo, CategoryIcon } from "./icons";
// import { useAllCategoriesMeta } from "../../hooks";
// import { css } from "@emotion/core";

// const CategoryTilesWrapper = styled.div`
//   background: #293462;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   position: fixed;
//   width: 100%;
//   font-family: "Source Sans Pro";
//   z-index: 99;
// `;

// const TileList = styled.ul`
//   list-style: none;
//   display: flex;
//   margin: 0;
//   padding: 0;
// `;

// const CategoryElementWrapper = styled.li`
//   padding: 0;
//   margin: 0 5px;
//   a {
//     padding: 14px;
//     height: 60px;
//     display: flex;
//     align-items: center;
//     color: rgba(255, 255, 255, 0.7);
//     text-decoration: none;
//     font-size: 15px;
//     &:hover {
//       color: rgba(255, 255, 255, 0.9);
//     }
//   }
// `;

// const linkStyle = css`
//   border-top: 4px solid transparent;
//   border-bottom: 4px solid transparent;
//   transition: color 60ms ease-out;
// `;

// const iconStyle = css`
//   margin-right: 5px;
// `;

// const activeLinkStyle = color => ({
//   borderBottom: `5px solid rgb(${color})`,
//   color: "white"
// });

// const CategoryElement = ({ label, desc, slug, color }) => (
//   <CategoryElementWrapper>
//     <Link
//       to={`/docs/${slug}/`}
//       partiallyActive
//       css={linkStyle}
//       activeStyle={activeLinkStyle(color)}
//     >
//       <CategoryIcon category={slug} css={iconStyle} />
//       {label}
//       {desc}
//     </Link>
//   </CategoryElementWrapper>
// );

// const CategoryTiles = () => {
//   const categories = useAllCategoriesMeta();

//   return (
//     <CategoryTilesWrapper>
//       <TileList>
//         {categories.map(({ color, title, slug }) => (
//           <CategoryElement key={slug} color={color} label={title} slug={slug} />
//         ))}
//       </TileList>
//     </CategoryTilesWrapper>
//   );
// };

const CategoryTiles = () => <div> elo</div>;
export { CategoryTiles };
