const dataurl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

const data = fetch(dataurl)
                .then((res) => res.json())
                .then(data => drawCahrt(data));

const drawCahrt = (data) => {
    const w = 1000;
    const h = 500;
    const padding = 50;
    const minYear = d3.min(data, d => d.Year);
    const maxYear = d3.max(data, d => d.Year);
    const minTime = d3.min(data, d => d.Time);
    const maxTime = d3.max(data, d => d.Time);

    const scaleYear = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([padding, w - padding]);
    const scaleTime = d3.scaleTime()
        .domain([new Date("2000-01-01T00:"+ minTime), new Date("2000-01-01T00:" + maxTime)])
        .range([padding, h - padding]);
        
    const svg = d3.select(".scatterplot")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => scaleYear(d.Year) )
        .attr("cy", (d) => scaleTime(new Date("2000-01-01T00:" + d.Time)))
        .attr("r", 5)
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Year)
        .attr("data-yvalue", d => d.Time)
        .on("mouseover", (e, d) => {
            d3.select("#tooltip")
                .attr("data-year", d.Year)
                .style("visibility", "visible")
                .text(d.Year)
                // .style("transform", `translateX(${e.clientX}px) translateY(${e.clientY}px)`)
        })
        .on("mouseout", () => {
            d3.select("#tooltip")
                .style("visibility", "hidden");
        })

    // const xAxisScale = d3.scaleTime()
    //     .domain([firstDate, lastDate])
    //     .range([padding, padding + (dataset.length-1)*width])
    // const xAxis = d3.axisBottom(xAxisScale);

    // const yAxisScale = d3.scaleLinear()
    //     .domain([0,max])
    //     .range([h-2*padding, 0]);
    // const yAxis = d3.axisLeft(yAxisScale);

    // const xAxisLine = svg.append("g")
    //     .attr("id", "x-axis")
    //     .attr("transform", `translate(${0}, ${h - padding})`)
    //     .call(xAxis);

    // let xAxisEl = xAxisLine.select(".domain");
    // let newXAxisD = xAxisEl.attr("d").slice(0,-2).split("H")[0] + "H" +
    //     (+xAxisEl.attr("d").slice(0,-2).split("H")[1] + width);
    // xAxisEl.attr("d", newXAxisD);

    // const yAxisLine = svg.append("g")
    //     .attr("id", "y-axis")
    //     .attr("transform", `translate(${padding}, ${padding})`)
    //     .call(yAxis);

    // let yAxisEl = yAxisLine.select(".domain");
    // let newYAxisD = yAxisEl.attr("d").slice(0,-2);
    // yAxisEl.attr("d", newYAxisD);

    d3.select(".scatterplot")
        .append("div")
        .attr("id", "tooltip")
        .style("visibility", "hidden");
}

// function drawCahrt(data){
//     const minTime = "23:00";
//     const maxTime = "25:00";
//     const firstDate = new Date("2000-01-01T00:"+minTime);
//     const lastDate = new Date("2000-01-01T00:"+maxTime);
//     console.log('firstDate', firstDate);
//     console.log('lastDate', lastDate);

//     const scaleTime = d3.scaleTime()
//         .domain([firstDate, lastDate])
//         .range([0, 500]);
//     console.log(scaleTime(Date.parse("2000-01-01T23:50")));
// }