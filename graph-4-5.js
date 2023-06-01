// 设置常数
var MARGIN_4 = { top: 40, right: 40, bottom: 40, left: 40 }
var WIDTH_4 = 800 - MARGIN_4.left - MARGIN_4.right
var HEIGHT_4 = 600 - MARGIN_4.top - MARGIN_4.bottom

var CENTRE_4 = 260

var IMAGE_WIDTH_4 = 100
var IMAGE_HEIGHT_4 = 100

// 创建svg
var svg_4 = d3.select("#container_4")
    .append("svg")
    .attr("width", WIDTH_4 + MARGIN_4.left + MARGIN_4.right)
    .attr("height", HEIGHT_4 + MARGIN_4.top + MARGIN_4.bottom)
    // .attr("style", "border:1px solid blue")
    .append("g")
    .attr("transform",
        "translate(" + MARGIN_4.left + "," + MARGIN_4.top + ")")
    .style("display", "block")

// // 加入框，方便看画板大小
// var border_4 = svg_4
//     .append("rect")
//     .attr("width", WIDTH_4)
//     .attr("height", HEIGHT_4)
//     .attr("stroke", "green")
//     .attr("stroke-width", 1)
//     .attr("fill", "none")

// A color scale for groups:
var scale_color = d3.scaleOrdinal()
.domain(["Physics, Chemistry, Medicine"])
.range(d3.schemeTableau10);

// 根据年份scale x轴
var scale_x_4 = d3.scaleLinear()
    .range([0, WIDTH_4])
    .domain([1902, 2016])

// 用x scale生成x轴
var x_axis_4 = d3.axisBottom()
    .scale(scale_x_4)

// 添加g以加入x轴
var x_axis_g_4 = svg_4.append("g")
    .attr("transform", "translate(0," + (HEIGHT_4 - CENTRE_4) + ")")
    .call(x_axis_4)

// 隐藏x轴的标签
x_axis_g_4
    .selectAll("text")
    .style("display", "none")

// 隐藏x轴的ticks
x_axis_g_4
    .selectAll(".tick")
    .selectAll("line")
    .style("visibility", "hidden")

// 导入节点数据
d3.json("data/prized_more_than_1.json").then(function (data) {
    console.log(data);

    // 节点名称（因为没有重叠年份，直接以年份命名）
    var allNodes_4 = data.map(function (d) { return d.prize_year })

    // List of groups
    var allFields_4 = data.map(function (d) { return d.field })
    allFields_4 = [...new Set(allFields_4)]

    console.log(allFields_4)

    // 给每个节点添加circle
    var nodes_4 = svg_4
        .selectAll("mynodes")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return (scale_x_4(d.prize_year)) })
        .attr("cy", HEIGHT_4 - CENTRE_4)
        .attr("r", 5)
        .style("fill", "grey")
        .style("fill", function (d) { return scale_color(d.field) })
        .attr("stroke", "none")


    // 给每个节点添加标签（年份）
    var labels_4 = svg_4
        .selectAll("mylabels")
        .data(data)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(function (d) { return (d.prize_year) })
        .style("text-anchor", "end")
        .attr("transform", function (d) { return ("translate(" + (scale_x_4(d.prize_year)) + "," + (HEIGHT_4 - CENTRE_4 + 15) + ")rotate(-45)") })
        .style("font-size", 10)

    // 给节点加上on hover的文字
    nodes_4
        .on("mouseover", function (event, d) {
            var prizeYear = d.prize_year
            var laureateName = d.laureate_name
            var field = d.field

            console.log(laureateName)

            // 把诺奖得主的姓名首字母改成大写，例如Curie, M
            var arr = laureateName.split(", ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            var laureateName = arr.join(", ")

            // 在页面上显示信息
            var tooltip = d3.select("#tooltip_4");
            tooltip
                .text(laureateName + " won the Nobel Prize in " + field + " in " + prizeYear)
                .style("font-size", 10)
                .style("visibility", "visible")
                .style("left", WIDTH_4 / 2)
                .style("top", HEIGHT_4 / 2)
        })
        .on("mouseout", function () {
            d3.select("#tooltip_4")
                .style("visibility", "hidden");
        })
})



// 导入边数据
d3.json("data/links_prized_more_than_1.json").then(function (data) {
    console.log(data)

    // 添加链接 (upwards arc)
    var links_up_4 = svg_4
        .selectAll('mylinks')
        .data(data)
        .enter()
        .append('path')
        .filter(function (d) { return d.laureate_name != "bardeen, j" })
        .attr('d', function (d) {
            start = scale_x_4(d.source)    // X position of start node on the X axis
            end = scale_x_4(d.target)      // X position of end node
            return ['M', start, HEIGHT_4 - CENTRE_4,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                'A',                            // This means we're gonna build an elliptical arc
                (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                (start - end) / 2, 0, 0, ',',
                1, end, ',', HEIGHT_4 - CENTRE_4] // 1 = arc on the top
                .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "grey")
        .style("stroke-width", 1)

    // 添加链接 (downwards arc)
    var links_down_4 = svg_4
        .selectAll('mylinks')
        .data(data)
        .enter()
        .append('path')
        .filter(function (d) { return d.laureate_name == "bardeen, j" })
        .attr('d', function (d) {
            start = scale_x_4(d.source)    // X position of start node on the X axis
            end = scale_x_4(d.target)      // X position of end node
            return ['M', start, HEIGHT_4 - CENTRE_4,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                'A',                            // This means we're gonna build an elliptical arc
                (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                (start - end) / 2, 0, 0, ',',
                0, end, ',', HEIGHT_4 - CENTRE_4] // 0 = arc at the bottom
                .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "grey")
        .style("stroke-width", 1)

    // 添加链接的标签 (upwards arc)
    var link_labels_up_4 = svg_4
        .selectAll("mylinklabels")
        .data(data)
        .enter()
        .append("text")
        .filter(function (d) { return d.laureate_name != "bardeen, j" })
        .attr("x", 0)
        .attr("y", 0)
        .text(function (d) { return (d.laureate_name) })
        .style("text-anchor", "middle")
        .attr("transform", function (d) {
            console.log(HEIGHT_4 - 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2)
            return ("translate(" + (scale_x_4((d.source + d.target) / 2)) + "," + (HEIGHT_4 - CENTRE_4 - 10 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .style("font-size", 15)

    // 添加链接的标签 (downwards arc)
    var link_labels_down_4 = svg_4
        .selectAll("mylinklabels")
        .data(data)
        .enter()
        .append("text")
        .filter(function (d) { return d.laureate_name == "bardeen, j" })
        .attr("x", 0)
        .attr("y", 0)
        .text(function (d) { return (d.laureate_name) })
        .style("text-anchor", "middle")
        .attr("transform", function (d) {
            console.log(HEIGHT_4 - 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2)
            return ("translate(" + (scale_x_4((d.source + d.target) / 2)) + "," + (HEIGHT_4 - CENTRE_4 + 120 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .style("font-size", 15)


    var image_up_4 = svg_4
        .selectAll("images")
        .data(data)
        .enter()
        .append("svg:image")
        .filter(function (d) { return d.laureate_name != "bardeen, j" })
        .attr("xlink:href", function (d) { return d.image })
        .attr("x", 0)
        .attr("y", 0)
        .attr("transform", function (d) {
            console.log(HEIGHT_4 - 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2)
            return ("translate(" + (scale_x_4((d.source + d.target) / 2) - IMAGE_WIDTH_4 / 2) + "," + (HEIGHT_4 - CENTRE_4 - IMAGE_HEIGHT_4 - 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .attr('width', IMAGE_WIDTH_4)
        .attr('height', IMAGE_HEIGHT_4)


    var image_down_4 = svg_4
        .selectAll("images")
        .data(data)
        .enter()
        .append("svg:image")
        .filter(function (d) { return d.laureate_name == "bardeen, j" })
        .attr("xlink:href", function (d) { return d.image })
        .attr("x", 0)
        .attr("y", 0)
        .attr("transform", function (d) {
            console.log(HEIGHT_4 - 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2)
            return ("translate(" + (scale_x_4((d.source + d.target) / 2) - IMAGE_WIDTH_4 / 2) + "," + (HEIGHT_4 - CENTRE_4 + IMAGE_HEIGHT_4 + 30 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .attr('width', IMAGE_WIDTH_4)
        .attr('height', IMAGE_HEIGHT_4)
})



// Dimensions of the SVG container
var WIDTH_5 = 500;
var HEIGHT_5 = 500;

var TRIANGLE_HEIGHT = 300

// Define the ternary coordinates
var triangleWidth = 2 / Math.sqrt(3) * TRIANGLE_HEIGHT;
var coordinates = [
    { x: 0, y: TRIANGLE_HEIGHT },
    { x: triangleWidth, y: TRIANGLE_HEIGHT },
    { x: triangleWidth / 2, y: 0 }
];


// Set up the SVG container
var svg_chem_5 = d3.select("#container_chem_5")
    .append("svg")
    .attr("width", WIDTH_5)
    .attr("height", HEIGHT_5);

// Draw the triangle sides
svg_chem_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_chem_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_chem_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

// Data for the ternary plot
d3.json("data/chem_laureate_topics.json").then(function (data) {

    // Plot the data points
    nodes_chem_5 = svg_chem_5.selectAll(".data-point-chem")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point-chem")
        .attr("cx", function (d) {
            return triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("cy", function (d) {
            return TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("r", 5)
        .attr("fill", scale_color("Chemistry"))

    // 给节点加上on hover的文字
    nodes_chem_5
        .on("mouseover", function (event, d) {
            var laureateName = d.laureateName

            // 把诺奖得主的姓名首字母改成大写，例如Curie, M
            var arr = laureateName.split(", ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            var laureateName = arr.join(", ")

            // 在页面上显示信息
            var tooltip = d3.select("#tooltip_chem_5");
            tooltip
                .text(laureateName)
                .style("font-size", 10)
                .style("visibility", "visible")
                .style("left", WIDTH_5 / 2)
                .style("top", HEIGHT_5 / 2)
        })
        .on("mouseout", function () {
            d3.select("#tooltip_chem_5")
                .style("visibility", "hidden");
        })
})


// Set up the SVG container
var svg_phy_5 = d3.select("#container_phy_5")
    .append("svg")
    .attr("width", WIDTH_5)
    .attr("height", HEIGHT_5);

// Draw the triangle sides
svg_phy_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_phy_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_phy_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");


d3.json("data/phy_laureate_topics.json").then(function (data) {

    // var triangleSize = 35
    // var triangle = d3.symbol()
    //     .type(d3.symbolTriangle)
    //     .size(triangleSize)
    // console.log(triangle)

    // Plot the data points
    svg_phy_5.selectAll(".data-point-phy")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point-phy")
        .attr("cx", function (d) {
            return triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("cy", function (d) {
            return TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("r", 5)
        .attr("fill", scale_color("Physics"))
})


// Set up the SVG container
var svg_med_5 = d3.select("#container_med_5")
    .append("svg")
    .attr("width", WIDTH_5)
    .attr("height", HEIGHT_5);

// Draw the triangle sides
svg_med_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_med_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_med_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

d3.json("data/med_laureate_topics.json").then(function (data) {

    // var squareSize = 70
    // var square = d3.symbol()
    //     .type(d3.symbolSquare)
    //     .size(squareSize)

    // Plot the data points
    svg_med_5.selectAll(".data-point-med")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point-med")
        .attr("cx", function (d) {
            return triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("cy", function (d) {
            return TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
        })
        .attr("r", 5)
        .attr("fill", scale_color("Medicine"))
})