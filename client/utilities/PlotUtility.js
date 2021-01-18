const PlotUtility = () => {
  const plotMortgage = (mortgage, plotDimensions) => {
    const { width, height } = plotDimensions;

    const {
      amount,
      rate,
      term,
      //numberpayments,
      downpayment,
      plotType
    } = mortgage;

    const principle = amount - downpayment;

    const canvas = document.getElementById("mortgageCanvas");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    context.moveTo(0, height);

    const drawXAxis = (context, minX, maxX, minY, color, thickness) => {
      context.save();
      context.beginPath();
      context.moveTo(minX, minY);
      context.lineTo(maxX, minY);
      context.lineWidth = thickness;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    };

    const drawXTickMarks = (
      minX,
      maxX,
      minY,
      incX,
      xTickHeight,
      color,
      thickness
    ) => {
      const drawXTickMark = (
        label,
        minX,
        minY,
        x,
        xTickHeight,
        color,
        thickness
      ) => {
        context.save();
        context.beginPath();
        context.moveTo(minX + x, minY);
        context.lineTo(minX + x, minY - xTickHeight);
        context.fillText(label, minX + x - 4, minY + 20);
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

      let label = 0;

      for (let x = minX; x <= maxX; x += incX) {
        drawXTickMark(label, minX, minY, x, xTickHeight, color, thickness);
        label += 1;
      }
    };

    const drawYAxis = (context, minX, minY, maxY, color, thickness) => {
      context.save();
      context.beginPath();
      context.moveTo(minX, minY);
      context.lineTo(minX, maxY);
      context.lineWidth = thickness;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    };

    const drawYTickMarks = (
      minX,
      minY,
      maxY,
      incY,
      yTickHeight,
      color,
      thickness
    ) => {
      const drawYTickMark = (
        label,
        minX,
        minY,
        y,
        yTickHeight,
        color,
        thickness
      ) => {
        context.save();
        context.beginPath();
        context.moveTo(minX, minY - y);
        context.lineTo(minX + yTickHeight, minY - y);
        context.fillText(label, minX - 20, minY - y + 4);
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

      let i = 0;
      let label = 0;

      for (let y = maxY; y < minY; y += incY) {
        label = 100 * i;
        drawYTickMark(label, minX, minY, y, yTickHeight, color, thickness);
        i += 1;
      }
    };

    const totalEquation = (
      x,
      incX,
      incY,
      xMargin,
      yMargin,
      amount,
      term,
      rate
    ) => {
      const xMax = term * incX;
      const yMax = 10 * incY;

      const exponent = 0.5;

      const scale = amount / 1000000;

      const y =
        yMax *
        (1 -
          (1 + rate / 20) *
            scale *
            (Math.pow(xMax - x + xMargin, exponent) /
              Math.pow(xMax, exponent)));

      return y;
    };

    const principleEquation = (
      x,
      incX,
      incY,
      xMargin,
      yMargin,
      amount,
      term
      //rate
    ) => {
      const xMax = term * incX; // 660
      const yMax = 10 * incY; // 600

      const exponent = 0.5;

      const scale = amount / 1000000;

      const y =
        yMax *
        (1 -
          scale *
            (Math.pow(xMax - x + xMargin, exponent) /
              Math.pow(xMax, exponent)));

      return y;
    };

    const interestEquation = (
      x,
      incX,
      incY,
      xMargin,
      yMargin,
      amount,
      term,
      rate
    ) => {
      const xMax = term * incX;
      const yMax = 10 * incY;

      const exponent = 0.5;

      const scale = amount / 1000000;

      const y =
        yMax *
        (1 -
          (rate / 20) *
            scale *
            (Math.pow(xMax - x + xMargin, exponent) /
              Math.pow(xMax, exponent)));

      return y;
    };

    const drawEquation = (
      context,
      minX,
      maxX,
      equation,
      amount,
      incX,
      incY,
      xMargin,
      yMargin,
      rate,
      color,
      thickness
    ) => {
      const iteration = (maxX - minX) / (10 * term);

      context.save();

      context.beginPath();
      context.moveTo(
        minX,
        equation(minX, incX, incY, xMargin, yMargin, amount, term, rate)
      );

      for (let x = minX; x <= maxX; x += iteration) {
        context.lineTo(
          x,
          equation(x, incX, incY, xMargin, yMargin, amount, term, rate)
        );
      }

      context.restore();
      context.lineJoin = "round";
      context.lineWidth = thickness;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    };

    const xMargin = 40;
    const yMargin = 40;

    const minX = xMargin;
    const maxX = width - xMargin;
    const minY = height - yMargin;
    const maxY = 0;

    const incX = (maxX - minX) / term;
    const incY = -(maxY - minY) / 10;

    const xTickHeight = -10;
    const yTickHeight = 10;

    drawXAxis(context, minX, maxX + 20, minY, "black", 1);
    drawXTickMarks(minX - 20, maxX, minY, incX, xTickHeight, "black", 1);

    drawYAxis(context, minX, minY, maxY, "black", 1);
    drawYTickMarks(
      minX + xTickHeight,
      minY,
      maxY,
      incY,
      yTickHeight,
      "black",
      1
    );

    let equation, equation1, equation2, equation3;

    switch (plotType) {
      case "total":
        equation = totalEquation;

        drawEquation(
          context,
          minX,
          maxX,
          equation,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "blue",
          1
        );
        break;
      case "interest":
        equation = interestEquation;

        drawEquation(
          context,
          minX,
          maxX,
          equation,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "red",
          1
        );
        break;
      case "principle":
        equation = principleEquation;

        drawEquation(
          context,
          minX,
          maxX,
          equation,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "green",
          1
        );
        break;
      default:
        equation1 = totalEquation;
        equation2 = principleEquation;
        equation3 = interestEquation;

        drawEquation(
          context,
          minX,
          maxX,
          equation1,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "blue",
          1
        );
        drawEquation(
          context,
          minX,
          maxX,
          equation2,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "green",
          1
        );
        drawEquation(
          context,
          minX,
          maxX,
          equation3,
          principle,
          incX,
          incY,
          xMargin,
          yMargin,
          rate,
          "red",
          1
        );
        break;
    }
  };

  return Object.freeze({
    plotMortgage
  });
};

export default PlotUtility;
