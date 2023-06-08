// 设置常数
var MARGIN_4 = { top: 40, right: 40, bottom: 40, left: 40 }
var WIDTH_4 = 800 - MARGIN_4.left - MARGIN_4.right
var HEIGHT_4 = 550 - MARGIN_4.top - MARGIN_4.bottom

var CENTRE_4 = 200

var IMAGE_WIDTH_4 = 100
var IMAGE_HEIGHT_4 = 125

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
    .domain(["Physics", "Medicine", "Chemistry"])
    .range(["#80a4d9", "#52b788", "#C77DFF"]);

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
d3.json("assets/data/prized_more_than_1.json").then(function (data) {

    // 节点名称（因为没有重叠年份，直接以年份命名）
    var allNodes_4 = data.map(function (d) { return d.prize_year })

    // List of groups
    var allFields_4 = data.map(function (d) { return d.field })
    allFields_4 = [...new Set(allFields_4)]

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
        .style("font-size", "12px")

    // 给节点加上on hover的文字
    nodes_4
        .on("mouseover", function (event, d) {
            var prizeYear = d.prize_year
            var laureateName = d.laureate_name
            var field = d.field

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
                .style("font-size", "15px")
                .style("visibility", "visible")
                //.style("left", (WIDTH_4 + MARGIN_4.left + MARGIN_4.right) / 2 + "px")
                .style("top", 10 + "px")
        })
        .on("mouseout", function () {
            d3.select("#tooltip_4")
                .style("visibility", "hidden");
        })
})



// 导入边数据
d3.json("assets/data/links_prized_more_than_1.json").then(function (data) {

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
            return ("translate(" + (scale_x_4((d.source + d.target) / 2)) + "," + (HEIGHT_4 - CENTRE_4 - 10 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .style("font-size", "15px")

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
            return ("translate(" + (scale_x_4((d.source + d.target) / 2)) + "," + (HEIGHT_4 - CENTRE_4 + 120 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .style("font-size", "15px")


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
            return ("translate(" + (scale_x_4((d.source + d.target) / 2) - IMAGE_WIDTH_4 / 2) + "," + (HEIGHT_4 - CENTRE_4 + IMAGE_HEIGHT_4 + 5 - (scale_x_4(d.target) - scale_x_4(d.source)) / 2) + ")")
        })
        .attr('width', IMAGE_WIDTH_4)
        .attr('height', IMAGE_HEIGHT_4)
})

// 三角图

// 定义常数
var MARGIN_5 = { top: 40, right: 40, bottom: 40, left: 40 }
var WIDTH_5 = 340 - MARGIN_5.left - MARGIN_5.right
var HEIGHT_5 = 340 - MARGIN_5.top - MARGIN_5.bottom

var TRIANGLE_HEIGHT = 250
var START_YR = 1907

// 定义三角形的坐标
var triangleWidth = 2 / Math.sqrt(3) * TRIANGLE_HEIGHT;
var coordinates = [
    { x: 0, y: TRIANGLE_HEIGHT },
    { x: triangleWidth, y: TRIANGLE_HEIGHT },
    { x: triangleWidth / 2, y: 0 }
];

// 根据想要的三角形大小设置x轴的scale（用以调整三角形大小）
var scale_x_5 = d3.scaleLinear()
    .range([0, WIDTH_5])
    .domain([0, triangleWidth])

// 根据想要的三角形大小设置y轴的scale（用以调整三角形大小）
var scale_y_5 = d3.scaleLinear()
    .range([0, HEIGHT_5])
    .domain([0, triangleWidth])

// 调整topic的scale
var scale_topic_5 = d3.scaleLinear()
    .range([0, scale_x_5(triangleWidth)])
    .domain([0, 1])

// 用topic scale生成topic1的轴
var topic_1_axis_5 = d3.axisLeft()
    .scale(scale_topic_5)

// 用topic scale生成topic2的轴
var topic_2_axis_5 = d3.axisBottom()
    .scale(scale_topic_5)

// 用topic scale生成topic1的轴
var topic_3_axis_5 = d3.axisLeft()
    .scale(scale_topic_5)


// CHEMISTRY子图

// 加入SVG
var svg_chem_5 = d3.select("#container_chem_5")
    .append("svg")
    .attr("width", WIDTH_5 + MARGIN_5.left + MARGIN_5.right)
    .attr("height", HEIGHT_5 + MARGIN_5.top + MARGIN_5.bottom)
    // .style("border", "1px solid blue")
    .append("g")
    .attr("transform", "translate(" + MARGIN_5.left + "," + MARGIN_5.top + ")");

// // 加入框，方便看画板大小
// var border_5 = svg_chem_5
//     .append("rect")
//     .attr("width", WIDTH_5)
//     .attr("height", HEIGHT_5)
//     .attr("stroke", "green")
//     .attr("stroke-width", 1)
//     .attr("fill", "none")

// 画三角形的边
svg_chem_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_chem_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_chem_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

// 添加g以加入topic1的轴
var topic_1_axis_g_5 = svg_chem_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[1].x) + "," + (scale_y_5(coordinates[1].y)) + "), rotate(150)")
    .call(topic_1_axis_5)
    .selectAll("text")
    .attr("transform", "translate(-32, 0), rotate(180)")

// 添加g以加入topic2的轴
var topic_2_axis_g_5 = svg_chem_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[0].x) + "," + (scale_y_5(coordinates[0].y)) + ")")
    .call(topic_2_axis_5)

// 添加g以加入topic1的轴
var topic_3_axis_g_5 = svg_chem_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[2].x) + "," + (scale_y_5(coordinates[2].y)) + "), rotate(30)")
    .call(topic_3_axis_5)

// 添加topic的标签
svg_chem_5.append("text")
    .text("← TOPIC 1")
    .attr("x", scale_x_5(coordinates[2].x) + 80)
    .attr("y", scale_y_5(coordinates[2].y - 190))
    .attr("transform", "rotate(60)")
    .style("text-anchor", "middle")

svg_chem_5.append("text")
    .text("TOPIC 2 →")
    .attr("x", scale_x_5(coordinates[2].x))
    .attr("y", scale_y_5(coordinates[1].y) + 40)
    .style("text-anchor", "middle")

svg_chem_5.append("text")
    .text("← TOPIC 3")
    .attr("x", scale_x_5(coordinates[0].x) - 80)
    .attr("y", scale_y_5(coordinates[0].y) - 180)
    .attr("transform", "rotate(-60)")
    .style("text-anchor", "middle")


// PHYSICS子图

// 加入SVG
var svg_phy_5 = d3.select("#container_phy_5")
    .append("svg")
    .attr("width", WIDTH_5 + MARGIN_5.left + MARGIN_5.right)
    .attr("height", HEIGHT_5 + MARGIN_5.top + MARGIN_5.bottom)
    // .style("border", "1px solid blue")
    .append("g")
    .attr("transform", "translate(" + MARGIN_5.left + "," + MARGIN_5.top + ")");

// // 加入框，方便看画板大小
// var border_5 = svg_phy_5
//     .append("rect")
//     .attr("width", WIDTH_5)
//     .attr("height", HEIGHT_5)
//     .attr("stroke", "green")
//     .attr("stroke-width", 1)
//     .attr("fill", "none")

// 画三角形的边
svg_phy_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_phy_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_phy_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

// 添加g以加入topic1的轴
var topic_1_axis_g_5 = svg_phy_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[1].x) + "," + (scale_y_5(coordinates[1].y)) + "), rotate(150)")
    .call(topic_1_axis_5)
    .selectAll("text")
    .attr("transform", "translate(-32, 0), rotate(180)")

// 添加g以加入topic2的轴
var topic_2_axis_g_5 = svg_phy_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[0].x) + "," + (scale_y_5(coordinates[0].y)) + ")")
    .call(topic_2_axis_5)

// 添加g以加入topic1的轴
var topic_3_axis_g_5 = svg_phy_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[2].x) + "," + (scale_y_5(coordinates[2].y)) + "), rotate(30)")
    .call(topic_3_axis_5)

// 添加topic的标签
svg_phy_5.append("text")
    .text("← TOPIC 1")
    .attr("x", scale_x_5(coordinates[2].x) + 80)
    .attr("y", scale_y_5(coordinates[2].y - 190))
    .attr("transform", "rotate(60)")
    .style("text-anchor", "middle")

svg_phy_5.append("text")
    .text("TOPIC 2 →")
    .attr("x", scale_x_5(coordinates[2].x))
    .attr("y", scale_y_5(coordinates[1].y) + 40)
    .style("text-anchor", "middle")

svg_phy_5.append("text")
    .text("← TOPIC 3")
    .attr("x", scale_x_5(coordinates[0].x) - 80)
    .attr("y", scale_y_5(coordinates[0].y) - 180)
    .attr("transform", "rotate(-60)")
    .style("text-anchor", "middle")

// MEDICINE子图

// 加入SVG
var svg_med_5 = d3.select("#container_med_5")
    .append("svg")
    .attr("width", WIDTH_5 + MARGIN_5.left + MARGIN_5.right)
    .attr("height", HEIGHT_5 + MARGIN_5.top + MARGIN_5.bottom)
    // .style("border", "1px solid blue")
    .append("g")
    .attr("transform", "translate(" + MARGIN_5.left + "," + MARGIN_5.top + ")");

// // 加入框，方便看画板大小
// var border_5 = svg_med_5
//     .append("rect")
//     .attr("width", WIDTH_5)
//     .attr("height", HEIGHT_5)
//     .attr("stroke", "green")
//     .attr("stroke-width", 1)
//     .attr("fill", "none")

// 画三角形的边
svg_med_5.append("path")
    .datum([coordinates[0], coordinates[1]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_med_5.append("path")
    .datum([coordinates[1], coordinates[2]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

svg_med_5.append("path")
    .datum([coordinates[2], coordinates[0]])
    .attr("d", d3.line().x(function (d) { return scale_x_5(d.x); }).y(function (d) { return scale_y_5(d.y); }))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

// 添加g以加入topic1的轴
var topic_1_axis_g_5 = svg_med_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[1].x) + "," + (scale_y_5(coordinates[1].y)) + "), rotate(150)")
    .call(topic_1_axis_5)
    .selectAll("text")
    .attr("transform", "translate(-32, 0), rotate(180)")

// 添加g以加入topic2的轴
var topic_2_axis_g_5 = svg_med_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[0].x) + "," + (scale_y_5(coordinates[0].y)) + ")")
    .call(topic_2_axis_5)

// 添加g以加入topic1的轴
var topic_3_axis_g_5 = svg_med_5.append("g")
    .attr("transform", "translate(" + scale_x_5(coordinates[2].x) + "," + (scale_y_5(coordinates[2].y)) + "), rotate(30)")
    .call(topic_3_axis_5)

// 添加topic的标签
svg_med_5.append("text")
    .text("← TOPIC 1")
    .attr("x", scale_x_5(coordinates[2].x) + 80)
    .attr("y", scale_y_5(coordinates[2].y - 190))
    .attr("transform", "rotate(60)")
    .style("text-anchor", "middle")

svg_med_5.append("text")
    .text("TOPIC 2 →")
    .attr("x", scale_x_5(coordinates[2].x))
    .attr("y", scale_y_5(coordinates[1].y) + 40)
    .style("text-anchor", "middle")

svg_med_5.append("text")
    .text("← TOPIC 3")
    .attr("x", scale_x_5(coordinates[0].x) - 80)
    .attr("y", scale_y_5(coordinates[0].y) - 180)
    .attr("transform", "rotate(-60)")
    .style("text-anchor", "middle")


// 导入数据
Promise.all([
    d3.json("assets/data/chem_laureate_topics_by_year.json"),
    d3.json("assets/data/phy_laureate_topics_by_year.json"),
    d3.json("assets/data/med_laureate_topics_by_year.json")
]).then(function (data) {
    var data_chem = data[0]
    var data_phy = data[1]
    var data_med = data[2]

    // CHEMISTRY

    // 绘制圆点
    nodes_chem_5 = svg_chem_5.selectAll(".data-point-chem")
        .data(data_chem)
        .enter()
        .filter(function (d) { return d.pubYear == START_YR })
        .append("circle")
        .attr("class", "data-point-chem")
        .attr("cx", function (d) {
            var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
            // var x = d.topic2
            return scale_x_5(x)
        })
        .attr("cy", function (d) {
            var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
            return scale_y_5(y)
        })
        .attr("r", 5)
        .attr("fill", scale_color("Chemistry"))


    // 给点加上on hover的文字
    nodes_chem_5
        .on("mouseover", function (event, d) {
            var laureateName = d.laureateName
            var topic1 = Math.round(d.topic1 * 100) / 100
            var topic2 = Math.round(d.topic2 * 100) / 100
            var topic3 = Math.round(d.topic3 * 100) / 100

            // 把诺奖得主的姓名首字母改成大写，例如Curie, M
            var arr = laureateName.split(", ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            var laureateName = arr.join(", ")

            // 在页面上显示信息
            var tooltip = d3.select("#tooltip_chem_5");
            tooltip
                .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
                .style("font-size", "15px")
                .style("visibility", "visible")
                .style("left", "75%")
                .style("transform", "translateX(-50%)")
                .style("top", 35 + "px")
        })
        .on("mouseout", function () {
            d3.select("#tooltip_chem_5")
                .style("visibility", "hidden");
        })

    // PHYSICS

    // 绘制圆点
    nodes_phy_5 = svg_phy_5.selectAll(".data-point-phy")
        .data(data_phy)
        .enter()
        .filter(function (d) { return d.pubYear == START_YR })
        .append("circle")
        .attr("class", "data-point-phy")
        .attr("cx", function (d) {
            var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
            // var x = d.topic2
            return scale_x_5(x)
        })
        .attr("cy", function (d) {
            var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
            return scale_y_5(y)
        })
        .attr("r", 5)
        .attr("fill", scale_color("Physics"))

    // 给点加上on hover的文字
    nodes_phy_5
        .on("mouseover", function (event, d) {
            var laureateName = d.laureateName
            var topic1 = Math.round(d.topic1 * 100) / 100
            var topic2 = Math.round(d.topic2 * 100) / 100
            var topic3 = Math.round(d.topic3 * 100) / 100

            // 把诺奖得主的姓名首字母改成大写，例如Curie, M
            var arr = laureateName.split(", ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            var laureateName = arr.join(", ")

            // 在页面上显示信息
            var tooltip = d3.select("#tooltip_phy_5");
            tooltip
                .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
                .style("font-size", "15px")
                .style("visibility", "visible")
                .style("left", "75%")
                .style("transform", "translateX(-50%)")
                .style("top", 35 + "px")
        })
        .on("mouseout", function () {
            d3.select("#tooltip_phy_5")
                .style("visibility", "hidden");
        })

    // MEDICINE

    // 绘制圆点
    nodes_med_5 = svg_med_5.selectAll(".data-point-med")
        .data(data_med)
        .enter()
        .filter(function (d) { return d.pubYear == START_YR })
        .append("circle")
        .attr("class", "data-point-med")
        .attr("cx", function (d) {
            var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
            // var x = d.topic2
            return scale_x_5(x)
        })
        .attr("cy", function (d) {
            var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
            return scale_y_5(y)
        })
        .attr("r", 5)
        .attr("fill", scale_color("Medicine"))

    // 给点加上on hover的文字
    nodes_med_5
        .on("mouseover", function (event, d) {
            var laureateName = d.laureateName
            var topic1 = Math.round(d.topic1 * 100) / 100
            var topic2 = Math.round(d.topic2 * 100) / 100
            var topic3 = Math.round(d.topic3 * 100) / 100

            // 把诺奖得主的姓名首字母改成大写，例如Curie, M
            var arr = laureateName.split(", ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
            var laureateName = arr.join(", ")

            // 在页面上显示信息
            var tooltip = d3.select("#tooltip_med_5");
            tooltip
                .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
                .style("font-size", "15px")
                .style("visibility", "visible")
                .style("left", "75%")
                .style("transform", "translateX(-50%)")
                .style("top", 35 + "px")
        })
        .on("mouseout", function () {
            d3.select("#tooltip_med_5")
                .style("visibility", "hidden");
        })


    // 更新图的函数
    function updateChartSelectedYear(selectedYear, data, svg, pointClass, field, tooltipID) {
        var selectedData = data.filter(function (d) { return d.pubYear == selectedYear })

        nodes_5 = svg
            .selectAll("." + pointClass)
            .data(selectedData)

        nodes_5
            // 加入新数据
            .enter()
            .append("circle")
            .attr("class", pointClass)
            .on("mouseover", function (event, d) {
                // console.log("mouseover-ing")

                var laureateName = d.laureateName
                var topic1 = Math.round(d.topic1 * 100) / 100
                var topic2 = Math.round(d.topic2 * 100) / 100
                var topic3 = Math.round(d.topic3 * 100) / 100

                // 把诺奖得主的姓名首字母改成大写，例如Curie, M
                var arr = laureateName.split(", ")
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
                }
                var laureateName = arr.join(", ")

                // 在页面上显示信息
                var tooltip = d3.select(tooltipID);
                tooltip
                    .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
                    .style("font-size", "15px")
                    .style("visibility", "visible")
                    .style("left", "75%")
                    .style("transform", "translateX(-50%)")
                    .style("top", 35 + "px")
            })
            .on("mouseout", function (event, d) {
                d3.select(tooltipID)
                    .style("visibility", "hidden");
            })
            // 加入动画
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
                // var x = d.topic2
                return scale_x_5(x)
            })
            .attr("cy", function (d) {
                var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
                return scale_y_5(y)
            })
            .attr("r", 5)
            .attr("fill", scale_color(field))

        nodes_5
            // 更新现有数据
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
                // var x = d.topic2
                return scale_x_5(x)
            })
            .attr("cy", function (d) {
                var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
                return scale_y_5(y)
            })

        nodes_5
            .exit()
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove()


        // nodes_5
        //     .join(
        //         function (enter) {
        //             return enter
        //                 .append("circle")
        //                 .attr("class", pointClass)
        //                 .on("mouseover", function (event, d) {
        //                     console.log("mouseover-ing")

        //                     var laureateName = d.laureateName
        //                     var topic1 = d.topic1
        //                     var topic2 = d.topic2
        //                     var topic3 = d.topic3

        //                     // 把诺奖得主的姓名首字母改成大写，例如Curie, M
        //                     var arr = laureateName.split(", ")
        //                     for (var i = 0; i < arr.length; i++) {
        //                         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
        //                     }
        //                     var laureateName = arr.join(", ")

        //                     // 在页面上显示信息
        //                     var tooltip = d3.select(tooltipID);
        //                     tooltip
        //                         .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
        //                         .style("font-size", "15px")
        //                         .style("visibility", "visible")
        //                         .style("left", "50%")
        //                         .style("transform", "translateX(-50%)")
        //                         .style("top", HEIGHT_5 + 100 + "px")
        //                 })
        //                 .on("mouseout", mouseout)
        //                 // // 加入动画
        //                 .transition()
        //                 .duration(1000)
        //                 .attr("cx", function (d) {
        //                     var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
        //                     // var x = d.topic2
        //                     return scale_x_5(x)
        //                 })
        //                 .attr("cy", function (d) {
        //                     var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
        //                     return scale_y_5(y)
        //                 })
        //                 .attr("r", 5)
        //                 .attr("fill", scale_color(field))

        //         },
        //         function (update) {
        //             return update
        //                 .transition()
        //                 .duration(1000)
        //                 .attr("cx", function (d) {
        //                     var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
        //                     // var x = d.topic2
        //                     return scale_x_5(x)
        //                 })
        //                 .attr("cy", function (d) {
        //                     var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
        //                     return scale_y_5(y)
        //                 })
        //         },
        //         function (exit) {
        //             return exit
        //                 .transition()
        //                 .duration(1000)
        //                 .style("opacity", 0)
        //                 .remove()
        //         }
        //     )

        // 给点加上on hover的文字

    }


    // 当年份scroller被修改时，根据选取的年份更新图
    d3.select("#yrSlider_5").on("change", function (event, value) {
        var selectedValue = this.value
        // console.log(selectedValue)
        d3.select("#selectedYr").text(selectedValue)
        updateChartSelectedYear(selectedValue, data_chem, svg_chem_5, "data-point-chem", "Chemistry", "#tooltip_chem_5")
        updateChartSelectedYear(selectedValue, data_phy, svg_phy_5, "data-point-phy", "Physics", "#tooltip_phy_5")
        updateChartSelectedYear(selectedValue, data_med, svg_med_5, "data-point-med", "Medicine", "#tooltip_med_5")
    })

})

// 导入所有年份数据
Promise.all([
    d3.json("assets/data/chem_laureate_topics.json"),
    d3.json("assets/data/phy_laureate_topics.json"),
    d3.json("assets/data/med_laureate_topics.json")
]).then(function (data) {
    var data_chem = data[0]
    var data_phy = data[1]
    var data_med = data[2]

    // 更新图的函数
    function updateChartAllYear(data, svg, pointClass, field, tooltipID) {
        nodes_5 = svg
            .selectAll("." + pointClass)
            .data(data)

        nodes_5
            .enter()
            .append("circle")
            .attr("class", pointClass)
            // 给点加上on hover的文字
            .on("mouseover", function (event, d) {
                var laureateName = d.laureateName
                var topic1 = Math.round(d.topic1 * 100) / 100
                var topic2 = Math.round(d.topic2 * 100) / 100
                var topic3 = Math.round(d.topic3 * 100) / 100

                // 把诺奖得主的姓名首字母改成大写，例如Curie, M
                var arr = laureateName.split(", ")
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
                }
                var laureateName = arr.join(", ")

                // 在页面上显示信息
                var tooltip = d3.select(tooltipID);
                tooltip
                    .html(laureateName + "<br>Topic 1: " + topic1 + "<br>Topic 2: " + topic2 + "<br>Topic 3: " + topic3)
                    .style("font-size", "15px")
                    .style("visibility", "visible")
                    .style("left", "75%")
                    .style("transform", "translateX(-50%)")
                    .style("top", 35 + "px")
            })
            .on("mouseout", function () {
                d3.select(tooltipID)
                    .style("visibility", "hidden");
            })
            // 加入动画
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
                // var x = d.topic2
                return scale_x_5(x)
            })
            .attr("cy", function (d) {
                var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
                return scale_y_5(y)
            })
            .attr("r", 5)
            .attr("fill", scale_color(field))

        nodes_5
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                var x = triangleWidth * (1 / 2 * (d.topic1 + 2 * d.topic2) / (d.topic1 + d.topic2 + d.topic3))
                // var x = d.topic2
                return scale_x_5(x)
            })
            .attr("cy", function (d) {
                var y = TRIANGLE_HEIGHT - triangleWidth * (Math.sqrt(3) / 2 * d.topic1 / (d.topic1 + d.topic2 + d.topic3))
                return scale_y_5(y)
            })

        nodes_5
            .exit()
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove()

    }



    // 当按钮被点击时，更新图展示全部年份的平均值
    d3.select("#allYearButton_5").on("click", function (event, value) {
        updateChartAllYear(data_chem, svg_chem_5, "data-point-chem", "Chemistry", "#tooltip_chem_5")
        updateChartAllYear(data_phy, svg_phy_5, "data-point-phy", "Physics", "#tooltip_phy_5")
        updateChartAllYear(data_med, svg_med_5, "data-point-med", "Medicine", "#tooltip_med_5")
    })
})
