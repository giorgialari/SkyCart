import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  expandedIndex: number | null = null;
  faqs = [
    {
      question: 'What are the basic requirements for flying a drone?',
      answer: 'The requirements for flying a drone vary by country. Generally, you need to ensure your drone is within visual line of sight, follow local aviation laws, and in some places, register your drone with the relevant authorities. Always check the regulations in your area before flying.'
    },
    {
      question: 'Can drones fly in all weather conditions?',
      answer: 'Drones are sensitive to extreme weather. It\'s not advisable to fly in heavy rain, snow, or very windy conditions as these can affect the drone\'s performance and potentially damage it. Light conditions, however, like mild rain or low wind, may be acceptable for more advanced drones.'
    },
    {
      question: 'How long can a drone stay in the air?',
      answer: 'Flight time depends on the drone\'s model and battery capacity. Most consumer drones can fly for about 20 to 30 minutes on a single charge, while high-end models may offer slightly longer flight times.'
    },
    {
      question: 'Are drones difficult to operate?',
      answer: 'Modern drones are designed with user-friendliness in mind. Many come with automatic takeoff, landing, and return-to-home features, as well as intuitive remote controls. However, mastering drone flying does require practice, especially for manual maneuvering.'
    },
    {
      question: 'Can I use drones for commercial photography?',
      answer: 'Yes, drones are widely used for commercial photography and videography. However, if you\'re planning to use a drone for commercial purposes, you may need to obtain special licenses or permits, depending on your country\'s regulations.'
    }
  ];


  toggleCollapse(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
