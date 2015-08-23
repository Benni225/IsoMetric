/**
 * A library including all easing-functions. 
 */
﻿var IsoEasing = {
    Linear: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    QuadIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    QuadOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    QuadInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    CubicIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    CubicOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    CubicInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    QuartIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    QuartOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    QuartInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    QuintIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    QuintOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    QuintInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    SineIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    SineOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    SineInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    ExpoIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    ExpoOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    ExpoInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    CircIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    CircOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    CircInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};