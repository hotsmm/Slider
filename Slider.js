let projects = [{
	city: 'Rostov-on-Don',
	name: 'LCD Admiral',
	meters: '81',
	time: '3.5 months',
	cost: 'Upon request'
}, {
	city: 'Sochi',
	name: 'Thieves',
	meters: '105',
	time: '4 months',
	cost: 'Upon request'
}, {
	city: 'Rostov-on-Don',
	name: 'Patriotic',
	meters: '93',
	time: '3 months',
	cost: 'Upon request'
}];

let photosAdmiral = [{
	link: "./Images/admiral/smallhall.jpg",
	title: "Small coffee hall"
}, {
	link: "./Images/admiral/kitchen.jpg",
	title: "Kitchen"
}, {
	link: "./Images/admiral/livingroom.jpg",
	title: "Living room"
}, {
	link: "./Images/admiral/childroom.jpg",
	title: "Childroom"
}, {
	link: "./Images/admiral/bedroom.jpg",
	title: "Bedroom"
}, {
	link: "./Images/admiral/bathroom.jpg",
	title: "Bathroom"
}];

let photosSochi = [{
	link: "./Images/sochi/livingroom.jpg",
	title: "Livingroom"
}, {
	link: "./Images/sochi/kitchen.jpg",
	title: "Kitchen"
}, {
	link: "./Images/sochi/bathroom_1.jpg",
	title: "Bathroom 1"
}, {
	link: "./Images/sochi/childroom.jpg",
	title: "Childroom"
}, {
	link: "./Images/sochi/bedroom.jpg",
	title: "Bedroom"
}, {
	link: "./Images/sochi/bathroom_2.jpg",
	title: "Bathroom 2"
}];

let photosPatriot = [{
	link: "./Images/patriot/livingroom.jpg",
	title: "Livingroom"
}, {
	link: "./Images/patriot/bedroom_1.jpg",
	title: "Bedroom 1"
}, {
	link: "./Images/patriot/bathroom_1.jpg",
	title: "Bathroom 1"
}, {
	link: "./Images/patriot/childroom.jpg",
	title: "Childroom"
}, {
	link: "./Images/patriot/bedroom_2.jpg",
	title: "Bedroom 2"
}, {
	link: "./Images/patriot/bathroom_2.jpg",
	title: "Bathroom 2"
}];

function projectSlider() {
	if(!projects || !projects.length) return;

	let projectItems = document.querySelector('.project__items');
	let projectDetails = document.querySelector('.project__details');
	let projectDetail = document.querySelectorAll('.project__detail');
	let projectPages = document.querySelector('.project__pages');
	let sliderPhotos = document.querySelector('.project_photos-slider');
	let sliderDots = document.querySelector('.project_slider-dots');

	initProjects();
	projectLink();
	initArrows();
	initDots();
	
	function initProjects() {
		projects.forEach((project, index) => {
			let projectName = `<div class="project__item link-cursor n${index} ${index === 0 ? 'project__link-active' : ''}" data-index='${index}'>${projects[index].city}, ${projects[index].name}</div>`
			projectItems.innerHTML += projectName;
		});
	}

	function projectData(data) {
		projectDetail.forEach(project_detail => project_detail.lastElementChild.remove());
		projectDetails.querySelector('.detail-city').innerHTML += `<div>${data.city}<br>${data.name}</div>`;
		projectDetails.querySelector('.detail-meters').innerHTML += `<div>${data.meters} m&#178</div>`;
		projectDetails.querySelector('.detail-months').innerHTML += `<div>${data.time}</div>`;
		projectDetails.querySelector('.detail-cost').innerHTML += `<div>${data.cost}</div>`;
		projectDetail.forEach(project_detail => project_detail.lastElementChild.className = 'project__detail-data');
	}

	function projectLink() {
		projectItems.querySelectorAll('.project__item').forEach(link => {
			link.addEventListener('click', function() {
				changeProject(this.dataset.index);
			});
		}); 
	}
	
	function initArrows() {
		projectPages.querySelectorAll('.project__arrow').forEach(arrow => {
			arrow.addEventListener('click', () => {
				let currentProject = +projectItems.querySelector('.project__link-active').dataset.index;
				let nextProject;
				if(arrow.classList.contains('project__arrow-left')) {
					nextProject = (currentProject === 0) ? 2 : currentProject - 1;
				} else {
					nextProject = (currentProject === 2) ? 0 : currentProject + 1;
				}
				changeProject(nextProject);
			});
		});
	}

	function initDots() {
		projectPages.querySelectorAll('.project__pages-dot').forEach(dot => {
			dot.addEventListener('click', function() {
				changeProject(this.dataset.index);
			});
		}); 
	}

	function changeProject(num) {
		projectItems.querySelector('.project__link-active').classList.remove('project__link-active');
		projectItems.querySelector('.n' + num).classList.add('project__link-active');
		projectPages.querySelector('.dot-active').classList.remove('dot-active');
		projectPages.querySelector('.n' + num).classList.add('dot-active');
		
		projectData(projects[+num]);
		
		let projectPhotos;
		if (num == 0) {
				projectPhotos = photosAdmiral;
		} else if (num == 1) {
				projectPhotos = photosSochi;
		} else {
				projectPhotos = photosPatriot;
		}
		sliderPhotos.querySelectorAll('.project__image').forEach(image => image.remove());
		sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => dot.remove());
		photoSlider(projectPhotos);
	}

}


function photoSlider(photos) {
	if(!photos || !photos.length) return;

	let sliderPhotos = document.querySelector('.project_photos-slider');
	let sliderArrows = document.querySelector('.project_slider-arrows');
	let sliderDots = document.querySelector('.project_slider-dots');

	initPhotos();
	initArrows();
	initDots();

	function initPhotos() {
		photos.forEach((photo, index) => {
			let photoDiv = `<img class='project__image n${index} ${index === 0 ? 'active' : ''}' src='${photos[index].link}' alt='Admiral, ${photos[index].title}' data-index='${index}'></img>`;
			sliderPhotos.innerHTML += photoDiv;
		});
	}

	function initArrows() {
		sliderArrows.querySelectorAll('.project_slider-arrow').forEach(arrow => {
			arrow.addEventListener('click', (event) => {
				let currentPhoto = +sliderPhotos.querySelector('.active').dataset.index;
				let nextPhoto;
				if(arrow.classList.contains('left')) {
					nextPhoto = (currentPhoto === 0) ? photos.length - 1 : currentPhoto - 1;
				} else {
					nextPhoto = (currentPhoto === photos.length - 1) ? 0 : currentPhoto + 1;
				}
				event.stopImmediatePropagation();
				movePhotos(nextPhoto);
			});
		});
	}

	function initDots() {
		photos.forEach((photo, index) => {
			let dot = `<div class='slider__dots-item n${index} ${index === 0 ? 'active' : ''}' data-index='${index}'></div>`;
			sliderDots.innerHTML += dot;
		});
		sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
			dot.addEventListener('click', function() {
				movePhotos(this.dataset.index);
			});
		}); 
	}

	function movePhotos(num) {
		sliderPhotos.querySelector('.active').classList.remove('active');
		sliderPhotos.querySelector('.n' + num).classList.add('active');
		sliderDots.querySelector('.active').classList.remove('active');
		sliderDots.querySelector('.n' + num).classList.add('active');
	}

}


document.addEventListener('DOMContentLoaded', () => {
	projectSlider();
	photoSlider(photosAdmiral);
});