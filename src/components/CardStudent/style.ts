import styled from "styled-components";

export const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #f7f8fc;
  font-family: "Roboto", sans-serif;
  color: #10182f;
  flex-direction: column;
  width: 14rem;
  margin: 1rem;

  .container {
    display: flex;
    width: 1040px;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
  }
  .card-header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    min-height: 221px;
  }

  .tag {
    background: #cccccc;
    border-radius: 50px;
    font-size: 12px;
    margin: 0;
    color: #fff;
    padding: 2px 10px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .tag-teal {
    background-color: #47bcd4;
  }
  .tag-purple {
    background-color: #5e76bf;
  }
  .tag-red {
    background-color: #ff3b52;
  }

  .name {
    margin: 1rem 0;
  }

  .card-body p {
    font-size: 13px;
    margin: 0 0 10px;
    display: flex;
  }
`;
