/**
 * This function init the settings object with default values or with values that were saved in the DB
 */
function applySettings() {
    // Colors
    rssModel.settings.textColor = rssModel.settings.textColor ||  "#000000";
    rssModel.settings.titleTextColor = rssModel.settings.titleTextColor ||  "#000000";
    rssModel.settings.widgetBcgColor = rssModel.settings.widgetBcgColor || '#FFF';
    rssModel.settings.widgetBcgCB = rssModel.settings.widgetBcgCB || false;
    rssModel.settings.widgetBcgSlider = rssModel.settings.widgetBcgSlider || 0.5;
    rssModel.settings.feedBcgColor = rssModel.settings.feedBcgColor || '#F8F8F8';
    rssModel.settings.feedBcgCB = rssModel.settings.feedBcgCB || false;
    rssModel.settings.feedBcgSlider = rssModel.settings.feedBcgSlider || 0.5;

    // RSS feed link
    rssModel.settings.feedInputUrl = rssModel.settings.feedInputUrl || "";

    // Number of entries in the RSS feed
    rssModel.settings.numOfEntries = rssModel.settings.numOfEntries || 4;

    // List of ingredients
    rssModel.settings.listOfIngredients = rssModel.settings.listOfIngredients || "1 Cup Pumpkin";
    rssModel.settings.listOfSteps = rssModel.settings.listOfSteps || "Yah totally I can haz cheezburgrr by following zis recipe.";
    rssModel.settings.recipeName = rssModel.settings.recipeName || "Nutella Brownies";
}




