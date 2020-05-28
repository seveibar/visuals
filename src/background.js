import React from "react"
import { styled } from "@material-ui/core/styles"
import "./index.css"

const Background = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
  color: "#fff",
  fontFamily: "Inter",
  fontWeight: "bold",
  fontSize: 20,
})
const Container = styled("div")({
  width: 500,
  height: 400,
  position: "relative",
  backgroundColor: "#040404",
})
const Credit = styled("div")({
  position: "absolute",
  right: 0,
  bottom: 0,
  opacity: 0.25,
  fontSize: 12,
})

export default ({ children }) => {
  return (
    <Background>
      <Container>
        {children}
        <Credit>@seveibar</Credit>
      </Container>
    </Background>
  )
}
