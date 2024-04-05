const dataurl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

const data = fetch(dataurl)
                .then((res) => res.json())
                .then(data => drawCahrt(data));

const drawCahrt = (data) => {
    const w = 1000;
    const h = 500;
    const padding = 50;
    const minYear = new Date(0).setFullYear(d3.min(data, d => d.Year - 1));
    const maxYear = new Date(0).setFullYear(d3.max(data, d => d.Year + 1));
    const minTime = new Date("2000-01-01T00:"+ d3.min(data, d => d.Time));
    const maxTime = new Date("2000-01-01T00:" + d3.max(data, d => d.Time));

    const scaleYear = d3.scaleTime()
        .domain([minYear, maxYear])
        .range([padding, w - padding]);
    const scaleTime = d3.scaleTime()
        .domain([minTime, maxTime])
        .range([padding, h - padding]);
        
    const svg = d3.select(".scatterplot")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => scaleYear(new Date(0).setFullYear(d.Year)) )
        .attr("cy", (d) => scaleTime(new Date("2000-01-01T00:" + d.Time)))
        .attr("r", 5)
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Year)
        .attr("data-yvalue", d => new Date("2000-01-01T00:" + d.Time))
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
    
    const xAxis = d3.axisBottom(scaleYear);
    const yAxis = d3.axisLeft(scaleTime)
        .tickFormat(d3.timeFormat("%M:%S"));
    const xAxisLine = svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${0}, ${h - padding})`)
        .call(xAxis);

    const yAxisLine = svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${padding}, ${0})`)
        .call(yAxis);

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