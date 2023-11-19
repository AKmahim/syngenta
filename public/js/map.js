
// ============================ with all subdistricts ===============

function showMapData(district){
    const n1  = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    const n3 = Math.floor(Math.random() * 100);
    const n4 = Math.floor(Math.random() * 100);
    const n5 = Math.floor(Math.random() * 100);
    const n6 = Math.floor(Math.random() * 100);


    const mapData = `
    <div class="bg-[#fff] h-[800px] px-4 w-96 py-4 ">
                <h1 class="text-[40px] font-bold text-center mb-4" id="sidebar">${district}</h1>
                <!-- spray infomation box -->
                <div class="bg-[#001586] p-1 rounded-lg text-white mb-4">
                    <h1 class="text-[23px] font-medium text-center mb-2">Professional Spray Men Training</h1>
                    <div class="flex justify-between pb-4">
                        <div class="ps-4">
                            <h3 class="text-[30px] font-bold text-center">${n1}</h3>
                            <p class="text-[23px] font-medium text-center">Quantity</p>
                        </div>
                        <div class="border-solid border-e-2 border-[#DF3030]"></div>
                        <div class="pe-2">
                            <h3 class="text-[30px] font-bold text-center">${n2}</h3>
                            <p class="text-[23px] font-medium text-center">Outreach</p>
                        </div>
                    </div>
                </div>
                <!-- spray infomation box -->
                <div class="bg-[#06C246] p-1 rounded-lg text-white mb-4">
                    <h1 class="text-[23px] font-medium text-center mb-2">Lead Farmers Training on Stewardship</h1>
                    <div class="flex justify-between pb-4">
                        <div class="ps-4">
                            <h3 class="text-[30px] font-bold text-center">${n3}</h3>
                            <p class="text-[23px] font-medium text-center">Outreach</p>
                        </div>
                        <div class="border-solid border-e-2 border-[#DF3030]"></div>
                        <div class="pe-2">
                            <h3 class="text-[30px] font-bold text-center">${n4}</h3>
                            <p class="text-[23px] font-medium text-center">Outreach</p>
                        </div>
                    </div>
                </div>
                <!-- spray infomation box -->
                <div class="bg-[#AA0505] p-1 rounded-lg text-white ">
                    <h1 class="text-[23px] font-medium text-center mb-2">Farm Family Meeting</h1>
                    <div class="flex justify-between pb-4">
                        <div class="ps-4">
                            <h3 class="text-[30px] font-bold text-center">${n5}</h3>
                            <p class="text-[23px] font-medium text-center">Quantity</p>
                        </div>
                        <div class="border-solid border-e-2 border-[#DF3030]"></div>
                        <div class="pe-2">
                            <h3 class="text-[30px] font-bold text-center">${n6}</h3>
                            <p class="text-[23px] font-medium text-center">Outreach</p>
                        </div>
                    </div>
                </div>
             </div>
    `
    return mapData;
}

const drawMap = async () => {
    const mapLink = 'districts.geojson'
    try {
        const response = await fetch(mapLink);
        const data = await response.json();
        console.log(data.features);
        const svg = d3.select('#map')
            .append('svg')
            .attr('width', 500)
            .attr('height', 700);

        const projection = d3.geoMercator()
            .center([90.3563, 23.685])
            .scale(6000)
            .translate([250, 380]);

        const path = d3.geoPath()
            .projection(projection);

        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('class', 'district')
            .style('fill', 'green')
            .style('stroke', '#fff')
            .style('stroke-width', 0.5)
            .on('mouseover', function (d) {
                d3.select(this)
                    // .style('fill', '#99ff99')
                    .style('fill', 'red')
                    .style('transform', 'scale(1.02)');
                const randomData = Math.floor(Math.random() * 100);
                const districtName = d.target.__data__.properties.ADM2_EN;
                
            })
            .on('mouseout', function () {
                d3.select(this)
                    .style('fill', 'green')
                    .style('transform', 'scale(1)');
                
            })
            .on('click', function (d) {
                const districtName = d.target.__data__.properties.ADM2_EN;
                const loremIpsumData = `Our Meeting will held on ${districtName}`; // Replace this with your data

                d3.select('#infoSideBar')
                    .html(showMapData(districtName));
            });
        // Display district names
        svg.selectAll('text')
            .data(data.features)
            .enter()
            .append('text')
            .attr('x', d => path.centroid(d)[0])
            .attr('y', d => path.centroid(d)[1])
            .text(d => d.properties.ADM2_EN)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .attr('font-size', '8px')
            .attr('fill', 'black');

        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', '1px solid black')
            .style('padding', '5px');
        // ... (remaining code for displaying district names, tooltip, etc.)
    } catch (error) {
        console.log(error);
    }
};

drawMap();
