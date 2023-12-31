// assign samples.json URL to a constant

const samples_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function for the default plots
function init() {
    // select the drop-down element in index.html and store in variable
    let select = d3.select("#selDataset");
    // append names/IDs from samples to the dropdown
    d3.json(samples_url).then(function(data) {
        // store list of sample ids (names) in variable
        let sample_ids = data.names;
        // loop through each ID in the list and append the ID to the select variable
        sample_ids.forEach((id) => {
            select.append("option").text(id).property("value", id);
        });

        // use the first sample ID to build the default plots
        const firstSample = sample_ids[0];
        updatePlots(firstSample);
        updateMetadata(firstSample);
    });
}

// function to update the metadata based on drop-down selection
function updateMetadata(sample) {
    d3.json(samples_url).then(function(data) {
        // assign the metadata to a variable
        let metadata = data.metadata;
        // use .filter() to only return the metadata for the chosen sample by matching the ID
        let filterMetadata = metadata.filter(sampleObject => sampleObject.id == sample);
        // assign first element of filterMetadata array to a result variable
        let result = filterMetadata[0];

        // loop through each key:value pair in the metadata result dictionary and append it to the #sample-metadata html element
        // assign #sample-metadata to a variable 
        metadataPanel = d3.select("#sample-metadata").html("");
        // use Object.entries.forEach to return key:value pairs and append text to metadataPanel as h5
        Object.entries(result).forEach(([key, value]) => {
            metadataPanel.append("h5").text(`${key}: ${value}`)
        });

    });
}

// function to update the plots based on drop-down selection
function updatePlots(sample) {
    d3.json(samples_url).then(function(data) {
        // assign samples dictionary to a variable
        let samples = data.samples;
        // use .filter() to only return the sample data for the chosen sample by matching the ID
        let filterSamples = samples.filter(sampleObject => sampleObject.id == sample);
        // assign first element of filterSamples array to a result variable
        let result = filterSamples[0];
        
        // assign sample_values to a variable
        let sample_values = result.sample_values;
        // assign otu_ids to a variable 
        let otu_ids = result.otu_ids;
        // assign otu_labels to a variable
        let otu_labels = result.otu_labels;

        // build the bar chart
        let trace1 = {
            // slice first 10 elements of sample_values and reverse to sort in descending order on the bar chart
            x: sample_values.slice(0, 10).reverse(),
            // slice first 10 elements of otu_ids, use .map() to format as "OTU {id}" on the plot and reverse to sort in descending order
            y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            // slice first 10 elements of otu_labels and reverse to sort in descending order for hovertext
            text: otu_labels.slice(0, 10).reverse(),
            // set horizontal bar chart
            type: "bar",
            orientation: "h"
        };
        // bar chart data
        let bar_data = [trace1];
        // bar chart layout/title
        let bar_layout = {
            title: `Top 10 OTUs for Subject ID ${result.id}`
        };
        // build Plotly plot with data and layout, assigned to .bar id in html
        Plotly.newPlot("bar", bar_data, bar_layout);

        // build the bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            // set marker size as sample_values, color as otu_ids and colorscale to Jet
            marker: {size: sample_values, color: otu_ids, colorscale: "Jet"},
            // set hovertext
            text: otu_labels 
        };
        // bubble chart data
        let bubble_data = [trace2];
        // bubble chart layout/title and xaxis title
        let bubble_layout = {
            title: "OTUs by Sample",
            xaxis: {
                title: "OTU ID"
            }
        };

        // build Plotly plot with data and layout, assigned to .bubble id in html
        Plotly.newPlot("bubble", bubble_data, bubble_layout);

    });


}

// function to update the plots when a new sample is selected in the drop-down
function optionChanged(newSample) {
    updateMetadata(newSample);
    updatePlots(newSample);
}

// initialize the dashboard with the default plots
init();