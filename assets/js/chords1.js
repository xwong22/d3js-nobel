// var labels = [
//     "Physics",
//     "Medicine",
//     "Chemistry",
//     "Princeton University",
//     "Yale University",
//     "National Institutes of Health",
//     "Rockefeller University",
//     "Max Planck Society",
//     "University of California Berkeley",
//     "California Institute of Technology",
//     "Stanford University",
//     "University of Cambridge",
//     "Harvard",
// ];

// var matrix = [
//     [0.0, 0.0, 0.0, 9.0, 2.0, 0.0, 1.0, 3.0, 9.0, 7.0, 11.0, 11.0, 13.0],
//     [0.0, 0.0, 0.0, 1.0, 4.0, 15.0, 15.0, 8.0, 0.0, 9.0, 3.0, 7.0, 12.0],
//     [0.0, 0.0, 0.0, 3.0, 6.0, 1.0, 5.0, 10.0, 9.0, 5.0, 8.0, 10.0, 12.0],
//     [9.0, 1.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [2.0, 4.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [0.0, 15.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [1.0, 15.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [3.0, 8.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [9.0, 0.0, 9.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [7.0, 9.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [11.0, 3.0, 8.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [11.0, 7.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
//     [13.0, 12.0, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
// ];

var labels = [
    "Medicine",
    "Physics",
    "Chemistry",
    "Princeton University",
    "Yale University",
    "National Institutes of Health",
    "Rockefeller University",
    "Max Planck Society",
    "University of California Berkeley",
    "California Institute of Technology",
    "Stanford University",
    "University of Cambridge",
    "Harvard",
];

var matrix = [[0.0, 0.0, 0.0, 1.0, 4.0, 15.0, 15.0, 8.0, 0.0, 9.0, 3.0, 7.0, 12.0],
[0.0, 0.0, 0.0, 9.0, 2.0, 0.0, 1.0, 3.0, 9.0, 7.0, 11.0, 11.0, 13.0],
[0.0, 0.0, 0.0, 3.0, 6.0, 1.0, 5.0, 10.0, 9.0, 5.0, 8.0, 10.0, 12.0],
[1.0, 9.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[4.0, 2.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[15.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[15.0, 1.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[8.0, 3.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[0.0, 9.0, 9.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[9.0, 7.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[3.0, 11.0, 8.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[7.0, 11.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
[12.0, 13.0, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]];



COLORS = ['#52b788', '#80a4d9', '#C77DFF', '#7b2cbf', '#3c096c', '#ff6700', '#ffa500', '#f3de2c', '#ff8fa3', '#ff4d6d', '#d62828', '#111d13', '#3e6259']
var fill = d3
    .scaleOrdinal()
    .domain(d3.range(labels.length))
    .range(COLORS);


var MARGIN_2 = { top: 30, right: 25, bottom: 20, left: 25 },
    WIDTH_2 = 1200 - MARGIN_2.left - MARGIN_2.right,
    HEIGHT_2 = 800 - MARGIN_2.top - MARGIN_2.bottom,
    INNER_RADIUS_2 = Math.min(WIDTH_2, HEIGHT_2) * 0.35,
    OUTER_RADIUS_2 = INNER_RADIUS_2 * 1.04;

//初始化SVG
var svg_2 = d3
    .select("#chart")
    .append("svg")
    .attr("width", WIDTH_2 + MARGIN_2.left + MARGIN_2.right)
    .attr("height", HEIGHT_2 + MARGIN_2.top + MARGIN_2.bottom+140)
    .append("g")
    .attr(
        "transform",
        "translate(" +
        (MARGIN_2.left + WIDTH_2 / 2) +
        "," +
        (MARGIN_2.top + HEIGHT_2 / 2) +
        ")"
    )



var chord = d3
    .chord()
    .padAngle(0.04)
    .sortSubgroups(
        d3.descending
    )//将弦按从高到低的顺序在弧内进行排序
    .sortChords(d3.descending)(
        //当弦相交时，显示在顶部的弦，底部是最大的弦
        matrix
    );

//画外弧线
var arc = d3.arc().innerRadius(INNER_RADIUS_2).outerRadius(OUTER_RADIUS_2);

var g = svg_2
    .selectAll("g.group")
    .data(chord.groups)
    .enter()
    .append("g")
    .attr("class", function (d) {
        return "group " + labels[d.index];
    });

g.append("path")
    .attr("class", "arc")
    .style("stroke", function (d) {
        return fill(d.index);
    })
    .style("fill", function (d) {
        return fill(d.index);
    })
    .attr("d", arc)
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .style("opacity", 0.4);

//初始化刻度
function groupTicks(d) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, 1).map(function (v, i) {
        return {
            angle: v * k + d.startAngle,
            label: i % 5 === 0 ? v : null,
        };
    });
}

var ticks = svg_2
    .selectAll("g.group")
    .append("g")
    .attr("class", function (d) {
        return "ticks " + labels[d.index];
    })
    .selectAll("g.ticks")
    .data(groupTicks)
    .enter()
    .append("g")
    .attr("class", "ticks")
    .attr("transform", function (d) {
        return (
            "rotate(" +
            ((d.angle * 180) / Math.PI - 90) +
            ")" +
            "translate(" +
            (OUTER_RADIUS_2 + 10) +
            ",0)"
        );
    });

ticks
    .append("line")
    .attr("x1", 1)
    .attr("y1", 0)
    .attr("x2", 5)
    .attr("y2", 0)
    .style("stroke", "#000");

//显示圈外的数字
ticks
    .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("class", "tickLabels")
    .attr("transform", function (d) {
        return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
    })
    // .style("font-size", "18px")
    .style("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
    })
    .text(function (d) {
        return d.label;
    })
    .attr("opacity", 0);

//初始化labels
g.append("text")
    .each(function (d) {
        d.angle = (d.startAngle + d.endAngle) / 2;
    })
    .attr("dy", ".35em")
    .attr("class", "titles")
    .attr("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
    })
    .attr("transform", function (d) {
        return (
            "rotate(" +
            ((d.angle * 180) / Math.PI - 90) +
            ")" +
            "translate(" +
            (INNER_RADIUS_2 + 60) +
            ")" +
            (d.angle > Math.PI ? "rotate(180)" : "")
        );
    })
    .attr("opacity", 0)
    .text(function (d, i) {
        return labels[i];
    });

//初始化内弦
var chords = svg_2
    .selectAll("path.chord")
    .data(chord)
    .enter()
    .append("path")
    .attr("class", "chord")
    .style("stroke", function (d) {
        return d3.rgb(fill(d.source.index)).darker();
    })
    .style("fill", function (d) {
        return fill(d.source.index);
    })
    .attr("d", d3.ribbon().radius(INNER_RADIUS_2))
    .attr("opacity", 0);


// 可视化第一幕的文字
// 用来包装文字
var textCenter = svg_2.append("g").attr("class", "explanationWrapper");


var button = svg_2.append("g").attr("class", "explanationWrapper");
var buttonshow = button
  .append("g")
  .attr("class", "buttonGroup")
  .attr("cursor", "pointer")
  .on("click", function(e) {
    finalChord();
  });

buttonshow
  .append("rect")
  .attr("class", "buttonRect")
  .attr("x", -40)
  .attr("y", (24 * 12.5) / 2 + "px")
  .attr("width", 80)
  .attr("height", 30)
  .attr("rx", 5)
  .attr("ry", 5)
  .style("fill", "#ffffff")
  .style("stroke", "#000000");

buttonshow
  .append("text")
  .attr("class", "explanation")
  .attr("text-anchor", "middle")
  .attr("x", 0 + "px")
  .attr("y", (24 * 14) / 2 + "px")
  .attr("dy", "0.3em")
  .attr("opacity", 1)
  .text("SHOW");

  
// 上面的文字
var middleTextTop = textCenter
    .append("text")
    .attr("class", "explanation")
    .attr("text-anchor", "middle")
    .attr("x", 0 + "px")
    .attr("y", (-24 * 15) / 2 + "px")
    .attr("dy", "1em")
    .attr("opacity", 1)
    .text(
        // '我们统计了拥有最多诺贝尔奖 的学校/机构，并根据他们在不同领域 的诺贝尔奖学者数量观察各学校/机构在 不同领域的研究实力'
        // 'We have conducted an analysis on the institutions that have received the highest number of Nobel Prizes and examined their research capabilities across various fields by considering the number of Nobel laureates affiliated with each institution in those respective fields.'
        'We analyzed the institutions with the most Nobel laureates to gauge their research prowess in different fields based on the number of laureates in each field.'
    )
    .call(wrap, 350);

// 下面的文字
var middleTextBottom = textCenter
    .append("text")
    .attr("class", "explanation")
    .attr("text-anchor", "middle")
    .attr("x", 0 + "px")
    .attr("y", (-24 * 1) / 2 + "px")
    .attr("dy", "1em")
    .attr("opacity", 1)
    .text(
        // "在这10间学校/机构中， 学校共占了7间，机构占了3间， 现在我们来观察它们在不同领域的获奖情况"
        "Among these 10 institutions, 7 are universities and 3 are research organizations. Let's explore their Nobel Prize achievements in different fields."
    )
    .call(wrap, 350);


var opacityValueBase = 0.6;
var opacityValue = 0.4;

// 重新加载
d3.select("#reset")
	.on("click", function(e) {location.reload();});

    

//用来让点击show之后画弦图
function finalChord() {
    //把show按键隐藏起来
    d3.select("#show").style("visibility", "hidden");
    d3.select(".buttonGroup")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .on("end", function() {
      d3.select(this).style("visibility", "hidden");
    });
    
    //删掉文字
    changeTopText(
        (newText = ""),
        (loc = 0),
        (delayDisappear = 0),
        (delayAppear = 1)
    );
    changeBottomText(
        (newText = ""),
        (loc = 0),
        (delayDisappear = 0),
        (delayAppear = 1)
    );


    g.append("path")
    .style("stroke", function (d) {
        return fill(d.index);
    })
    .style("fill", function (d) {
        return fill(d.index);
    })
    .attr("d", arc)
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .style("opacity", 1);

    //滑动聚焦效果
    d3.selectAll(".group")
        .style("cursor", "pointer")
        .on("mouseenter", fade(0.02))
        .on("mouseleave", fade(0.6));
    //显示弦图
    chords.transition().duration(1000).style("opacity", opacityValueBase);

    // 显示数量
    svg_2
        .selectAll("g.group")
        .transition()
        .duration(100)
        .selectAll(".tickLabels")
        .style("opacity", 1);
    //显示labels
    svg_2
        .selectAll("g.group")
        .transition()
        .duration(100)
        .selectAll(".titles")
        .style("opacity", 1);
} /*finalChord*/


//补充function

//用来调整chord的透明度
function fade(opacity) {
    return function () {
        var currentChord = d3.select(this).datum();

        svg_2
            .selectAll("path.chord")
            .filter(function (d) {
                return (
                    d.source.index !== currentChord.index &&
                    d.target.index !== currentChord.index
                );
            })
            .transition()
            .style("stroke-opacity", opacity)
            .style("fill-opacity", opacity);
    };
}

//给定一个组，返回一个刻度角度和标签的数组
function groupTicks(d) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, 1).map(function (v, i) {
        return {
            angle: v * k + d.startAngle,
            label: i % 5 ? null : v ,
        };
    });
} /*groupTicks*/

////在总的过渡结束后才调用一个函数
function endall(transition, callback) {
    var n = 0;
    transition
        .each(function () {
            ++n;
        })
        .on("end", function () {
            if (!--n) callback.apply(this, arguments);
        });
} /*endall*/

//自动换句
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text
                .text(null)
                .append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", dy + "em");

        while ((word = words.pop())) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text
                    .append("tspan")
                    .attr("x", 0)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
} /*wrap*/


function changeTopText(
    newText,
    loc,
    delayDisappear,
    delayAppear,
    finalText,
    xloc,
    w
) {
    middleTextTop
        //隐藏字
        .transition()
        .delay(700 * delayDisappear)
        .duration(700)
        .attr("opacity", 0)
        //换字，用来删除
        .call(endall, function () {
            middleTextTop
                .text(newText)
                .attr("y", -24 * loc + "px")
                .attr("x", xloc + "px")
                .call(wrap, w);
        })
        .transition()
        .delay(700 * delayAppear)
        .duration(700)
        .attr("opacity", 1)


} /*changeTopText */


function changeBottomText(newText, loc, delayDisappear, delayAppear) {
    middleTextBottom
        //隐藏字
        .transition()
        .delay(700 * delayDisappear)
        .duration(700)
        .attr("opacity", 0)
        //换字，用来删除
        .call(endall, function () {
            middleTextBottom
                .text(newText)
                .attr("y", 24 * loc + "px")
                .call(wrap, 350);
        })
        .transition()
        .delay(700 * delayAppear)
        .duration(700)
        .attr("opacity", 1);
} 