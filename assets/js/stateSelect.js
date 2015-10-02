var vote2016 = vote2016 || {};

var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

 if (isSafari) {
  $("html").addClass("safari");
}

var isIos = !!/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIos) {
  $("html").addClass("ios");
}


var stateWebsites = [
  { "state": "AZ", "website": "https://servicearizona.com/webapp/evoter/" },
  { "state": "CA", "website": "http://registertovote.ca.gov/" },
  { "state": "CO", "website": "https://www.sos.state.co.us/voter-classic/pages/pub/home.xhtml" },
  { "state": "CT", "website": "https://voterregistration.ct.gov/OLVR/" },
  { "state": "DE", "website": "https://ivote.de.gov/" },
  { "state": "GA", "website": "https://registertovote.sos.ga.gov/GAOLVR/#no-back-button" },
  { "state": "HI", "website": "https://olvr.hawaii.gov/" },
  { "state": "IL", "website": "https://ova.elections.il.gov/" },
  { "state": "IN", "website": "http://indianavoters.in.gov/PublicSite/OVR/Introduction.aspx" },
  { "state": "KS", "website": "https://www.kdor.org/voterregistration/Default.aspx" },
  { "state": "LA", "website": "http://www.sos.la.gov/ElectionsAndVoting/Pages/OnlineVoterRegistration.aspx" },
  { "state": "MA", "website": "https://www.sec.state.ma.us/ovr/" },
  { "state": "MD", "website": "https://voterservices.elections.state.md.us/OnlineVoterRegistration/VoterType" },
  { "state": "MN", "website": "https://mnvotes.sos.state.mn.us/VoterRegistration/VoterRegistrationStep1.aspx" },
  { "state": "MO", "website": "http://www.sos.mo.gov/elections/goVoteMissouri/register.aspx" },
  { "state": "NV", "website": "https://nvsos.gov/sosvoterservices/Registration/step1.aspx" },
  { "state": "NY", "website": "http://dmv.ny.gov/org/more-info/electronic-voter-registration-application" },
  { "state": "OR", "website": "https://secure.sos.state.or.us/orestar/vr/register.do?lang=eng&source=SOS" },
  { "state": "PA", "website": "https://www.pavoterservices.state.pa.us/Pages/VoterRegistrationApplication.aspx" },
  { "state": "SC", "website": "https://info.scvotes.sc.gov/eng/ovr/start.aspx" },
  { "state": "UT", "website": "https://secure.utah.gov/voterreg/index.html" },
  { "state": "VA", "website": "https://www.vote.virginia.gov/" },
  { "state": "WA", "website": "https://wei.sos.wa.gov/agency/osos/en/pages/myvote.aspx" }
];

var noVoting = [
  { "state": "AS", "website": "http://www.americansamoaelectionoffice.org" },
  { "state": "GU", "website": "http://gec.guam.gov" },
  { "state": "MP", "website": "http://votecnmi.gov.mp" },
  { "state": "MT", "website": "http://sos.mt.gov/ELECTIONS/Officials/Forms/documents/Voter-Registration-Application.pdf" },
  { "state": "ND", "websote": "https://vip.sos.nd.gov/PortalList.aspx" },
  { "state": "NH", "website": "http://sos.nh.gov/Elections.aspx" },
  { "state": "PR", "website": "http://ceepur.org/"},
  { "state": "VI", "website": "http://www.vivote.gov" },
  { "state": "WY", "website": "http://soswy.state.wy.us/elections/" },
];

vote2016.website = {

  bindModalClose: function() {
    $(".close").bind("click", function(e){
      e.preventDefault();
      vote2016.website.closeModal();
    });
  },

  bindFunctions: function() {
    vote2016.website.bindModalClose();
    vote2016.website.bindSocialButtons();
    vote2016.website.bindStateSelect();
  },

  bindSocialButtons: function() {
    $(".social-buttons a").on("click", function(e){
      e.preventDefault();
      var url = $(this).attr("href");

      window.open(url, "targetWindow", "height=375,width=500");
    });

  },

  bindStateSelect: function() {
    $(".state-select select").bind("change", function(){
      vote2016.website.checkWebsite($(this));
      $("body").addClass("no-scroll");
    });
  },

  checkWebsite: function(self) {
    var selectedState = $(self).val(),
        state = $.grep(stateWebsites, function(e){ return e.state == selectedState; }),
        noVote = $.grep(noVoting, function(e){ return e.state == selectedState; });


    if (noVote.length === 1) {
      vote2016.website.loadNoVoteModal(noVote);
    } else if (state.length === 0) {
      vote2016.website.loadPdfModal();
    } else if (state.length === 1) {
      vote2016.website.loadStateModal(state);
    } else {
      alert("Error - Something Went Wrong");
    }
  },

  closeModal: function() {
    $(".overlay").removeClass("active");
    $(".modal").removeClass("active");
    $("body").removeClass("no-scroll");
  },

  loadNoVoteModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;
    $(".no-vote-modal .territory-name").text(stateName);
    $(".no-vote-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".no-vote-modal").addClass("active");
  },

  loadStateModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;
    $(".state-modal .state-name").text(stateName);
    $(".state-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".state-modal").addClass("active");
  },

  loadPdfModal: function() {
    $(".overlay").addClass("active");
    $(".pdf-modal").addClass("active");
  }
};

$(document).ready(vote2016.website.bindFunctions());

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    vote2016.website.closeModal();
  }
});
