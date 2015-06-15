(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about-text.md.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "## "
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n\n"
    + alias3(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"about","hash":{},"data":data}) : helper)))
    + "\n\n### Sidevalve\n\nThis game runs on [Sidevalve](https://github.com/sidevalve/sidevalve), a pretty cool game engine by Andrew Monks and Fenn Macon.\n\nYou can make your own game real easy.\n";
},"useData":true});
})();