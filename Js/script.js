function getTagHTML (tag, tagClass = "container__tag") {
  return  `<span class="${tagClass}">
            ${tag}
          </span>`
}

function getJobListingHTML(jobData, filterTags = []) {
  const job_tags_placeholder = "##JOBTAGS##";
  let jobListingHTML = `
  <div class="container__jobs-items">
    <div class="container__jobs-items-columns">
        <div class="container__jobs-items-columns-left">
            <img src="${jobData.logo}" alt="${jobData.company}" class="jobs-img">
            <div class="container__jobs-items-columns-left-info">
                <div class="container__jobs-items-columns-left-info-1">
                    <span class="container__jobs-items-columns-left-info-company">${jobData.company}</span>
                    <span class="container__features ${jobData.new} ">NEW!</span>
                    <span class="container__featuress ${jobData.featured} ">FEATURED</span>
                    
                </div>
                <span class="container__jobs-items-columns-left-info-title">${jobData.position}</span>
  
                <ul class="container__jobs-items-columns-left-info-details">
                    <li class="container__jobs-items-columns-left-info-details__1">${jobData.postedAt}</li>
                    <li class= "container__jobs-items-columns-left-info-details__1">${jobData.contract}</li>
                    <li class="container__jobs-items-columns-left-info-details__1">${jobData.location}</li>
                </ul>
                
            </div>
        </div>
        <div class="container__jobs-items-columns-right">
           ${job_tags_placeholder}
        </div>
    </div>
  </div>`

  const tagsFeatures = [
    jobData.role,
    jobData.level,
    ...jobData.languages,
    ...jobData.tools
  ];

  const passFilter = !filterTags.length || filterTags.every(tag => (
    tagsFeatures.includes(tag)
  ));

  if(!passFilter) {
    return "";
  }

  const tagString = tagsFeatures.reduce((acc, currentTag) => {
    return acc + getTagHTML(currentTag);
  }, "");
     
     return jobListingHTML.replace(job_tags_placeholder, tagString);
};


function toggleClass(el, className){
   if (el.classList.contains(className)) {
     el.classList.remove(className);

     return;
   }

   el.classList.add(className);
}

function getSearchBarTag(tagValue, searchContentElement) { 
  let searchBarTags = Array.from(searchContentElement.children)
  .map(node => node.innerHTML && node.innerHTML.trim())
  .filter(tag => !!tag);

 if(searchBarTags.includes(tagValue)) {
   

   searchBarTags = searchBarTags.filter(tag => tag !== tagValue);
 }else {
   searchBarTags = [...searchBarTags, tagValue]
 }

  return searchBarTags;
}


function setJobsListings(filterTags){
  const jobsListingsHTML = jobsListings.reduce((acc, currentListing) => {
    return acc + getJobListingHTML(currentListing, filterTags);
  }, "");

  document.getElementById("jobs").innerHTML = jobsListingsHTML;
}

window.addEventListener("click", (e)=>{
  const targetElement = e.target;
  const tagValue = targetElement.innerHTML.trim();
  const tagClasses = ["container__tag", "container-closetag"];

 

  if(!tagClasses.some(c => targetElement.classList.contains(c))) {
    return;
  }
  const searchContentElement = document.getElementById("search-content"); 
  const searchBarTags = getSearchBarTag(tagValue, searchContentElement);

  searchContentElement.innerHTML = searchBarTags.reduce((acc, currentTag) => {
    return acc +  getTagHTML(currentTag, "container-closetag");
  }, "");



  toggleClass(targetElement, "_tag--active");
  setJobsListings(searchBarTags);

   
});

setJobsListings();

