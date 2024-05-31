# Tut-10-Group-A-Kiki
## This is my personal part of the group project.I focus on User Input.
## About how to interact.
1.Move the mouse over a pattern and click it, the pattern will be disappeared.
2.Click the begin animation button, all the patterns will begin to spin.
3.Click the stop animation button, all the patterns will stop spinning.
4.Click the clear all the patterns button, the canvas will be cleard.
5.Click the reset all the patterns button, the patterns will be reseted on the canvas.
## About inspiration.
[hat spinning for one minute](https://www.bilibili.com/video/BV1Td4y1a7sX?vd_source=6fb27da0a12915fcca2eac0f68bc3cb9)
## Short technical explanation.
1. I add a `mousePressed()` and `redrawPatterns()` function. Once it find a pattern is clicked by mouse, the pattern will disappear.
2.I add 4 buttons. When the reset button is clicked, the `resetSketch `function will be called to reload all patterns.When the clear button is clicked, it calls the `clearPatterns` function to hide all patterns.When the begin animation button or stop animaton button is clicked, it will call the `beginAnimation` function and `stopAnimation` funtion to change the boolean to decide whether the patterns to rotate or not.
3.I thought it was too boring to only have black background after the pattern disappeared, so I Used `preload()` to import a picture of dmc meme as the background.