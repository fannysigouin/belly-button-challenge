# Belly Button Biodiversity Dashboard

This repository contains my work for the 14th challenge of the UofT SCS edX Data Bootcamp.

## Background

The goal of this challenge was to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](https://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human nabels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

This interactive dashboard is deployed to GitHub Pages and is accessible [here](https://fannysigouin.github.io/belly-button-challenge/).

## Summary 

The interactive dashboard produced contains two charts which dynamically update based on the sample ID selected by the dashboard user: a horizontal bar chart showing the top 10 OTUs by sample ID and a bubble chart showing all of the samples for the selected sample ID. The dashboard also includes a panel showing the test sample's metadata.

This was achieved first by building a function to initialize default charts when a user first views the dashboard while also adding all of the sample IDs to a drop-down menu. Another function was built to update the metadata when the dashboard user selects a new sample ID from the drop-down menu. A third function was built to update the bar chart and the bubble chart based on the user's sample ID selection. Lastly a fourth function was built to update the charts once a new selection is made in the drop-down menu.


## References

Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: https://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/.