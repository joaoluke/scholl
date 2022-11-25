import styled from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    float: left;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
  }

  a.logo {
    font-size: 25px;
    font-weight: bold;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }

  a.active {
    background-color: dodgerblue;
    color: white;
  }

  .header-right {
    float: right;
  }

  @media screen and (max-width: 500px) {
    a {
      float: none;
      display: block;
      text-align: left;
    }
    .header-right {
      float: none;
    }
  }
`;

export const LOGO = styled.img`
  width: 3rem;
`;
