document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const navItems = document.querySelectorAll('.nav-item');

  // Toggle Glassmorphism Navigation Overlay
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
    
    // Animate hamburger bars into an X shape when active
    const spans = menuToggle.querySelectorAll('.hamburger-lines span');
    if (menuOverlay.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
      spans[1].style.transform = 'rotate(-45deg) translate(3px, -3px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.transform = 'none';
    }
  });

  // Close menu drawer when clicking any link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      const spans = menuToggle.querySelectorAll('.hamburger-lines span');
      spans[0].style.transform = 'none';
      spans[1].style.transform = 'none';
    });
  });
});