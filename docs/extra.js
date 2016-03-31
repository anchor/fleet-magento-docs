jQuery(document).ready(function() {
  collapseSidebar()
});

function collapseSidebar() {
  let $ = jQuery;
  let nav = $('nav.wy-nav-side');
  let sections = $('li > ul', nav).parent('li');

  sections.each(function(idx, section) {
    let isActive = $('.current', section).length > 0;
    let control = $('<a class="collapse-control"><span class="collapsed">&#x25bc;</span><span class="expanded">&#x25ac;</span> '+$(' > ul > :first-child > span', section).html()+'</a>');
    control.click(handleToggleSection);
    if (!isActive) {
      control.addClass('collapsed');
      $('> ul', section).addClass('collapsed');
    }
    $(' > ul > :first-child > span', section).replaceWith(control);
  });

}

function handleToggleSection(event) {
  let $ = jQuery;
  let control = $(this);
  control.toggleClass('collapsed');
  let isCollapsed = control.hasClass('collapsed');

  let list = control.closest('ul');
  list.toggleClass('collapsed');

  // Collapse all children when we collapse the parent
  if (isCollapsed) {
    $('ul.subnav', this.parentNode).addClass('collapsed');
  }
}
