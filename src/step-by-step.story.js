// @flow

import React, { useState, useEffect } from "react"
import Background from "./background"
import useStages from "./use-stages.js"
import { styled } from "@material-ui/core/styles"
import range from "lodash/range"
import useRenderValue from "./use-render-value"
import seedrandom from "seedrandom"

const Title = styled("div")({
  color: "#fff",
  position: "absolute",
  left: 20,
  top: 20,
  transition: "opacity 500ms",
})

const BarText = styled("div")({
  position: "absolute",
  textAlign: "center",
  left: 0,
  top: -30,
})

const ProgressLineContainer = styled("div")({
  position: "absolute",
  width: "100%",
  bottom: 320,
  transition: "opacity 1s",
})
const DottedLine = styled("div")({
  width: "100%",
  opacity: 0.5,
  borderBottom: "2px dashed #fff",
})
const ProgressText = styled("div")({
  paddingBottom: 10,
  paddingLeft: 20,
})

const FinishLine = () => {
  const opacity = useRenderValue(1, 0)
  return (
    <ProgressLineContainer style={{ opacity }}>
      <ProgressText>Finish Line</ProgressText>
      <DottedLine />
    </ProgressLineContainer>
  )
}

const BarBox = styled("div")({
  position: "absolute",
  backgroundColor: "#fff",
  transition: "width 500ms, height 500ms, opacity 500ms, left 500ms",
})

const Bar = ({
  name,
  initialHeight = 0,
  height: heightProp,
  width,
  left,
  bottom,
  opacity: opacityProp = 1,
}) => {
  const height = useRenderValue(heightProp, initialHeight)
  const opacity = useRenderValue(opacityProp, 0)
  return (
    <BarBox style={{ width, height, left, bottom, opacity }}>
      <BarText>{name}</BarText>
    </BarBox>
  )
}

const dayHeights = [50, 70, 230, 270]
const rng = seedrandom(6)
for (let i = 0; i < 9; i++) {
  dayHeights.push(dayHeights[dayHeights.length - 1] + rng() ** 3 * 500)
}
dayHeights.push(dayHeights[dayHeights.length - 1] + 140)
const maxDayHeight = Math.max(...dayHeights)

const StepByStep = () => {
  const stage = useStages(18, 800)
  const days = Math.min(14, stage)
  return (
    <Background>
      <Title style={{ opacity: days < 4 ? 1 : 0 }}>Non-Linear Progress</Title>
      {range(0, days).map((day) => {
        let width = 100
        let text = `Day ${day + 1}`
        let height = dayHeights[day]
        let prevDayHeight = dayHeights[day - 1] || 0
        let margin = 20
        if (days > 4) {
          text = day + 1
          height = (height / maxDayHeight) * 300
          prevDayHeight = (prevDayHeight / maxDayHeight) * 300
          margin = 20 - 15 * (days / 14)
          width = (500 - margin * days) * (1 / (days + 1))
        }
        return (
          <Bar
            key={day}
            name={text}
            initialHeight={prevDayHeight}
            height={height}
            width={width}
            bottom={20}
            left={margin + (width + margin) * day}
          />
        )
      })}
      {days > 4 && <FinishLine />}
    </Background>
  )
}

export default {
  title: "Step by Step",
  component: StepByStep,
}

export const StepByStepStory = () => <StepByStep />
