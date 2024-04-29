
function removeClass({elem}: {elem?: Element}) {
  const drop_downs = document.getElementsByClassName('show-dropdown');

  Array.from(drop_downs).forEach((el) => {

    if(elem) {
      const currentTarget = elem.parentElement?.getElementsByTagName('div')[0];

      currentTarget !== el && el.classList.remove('show-dropdown');

    } else {
      el.classList.remove('show-dropdown')

    };
  });
};


export function closeDropDowns(e: MouseEvent) {
  const elem = e.target as Element | null;

  if(!elem) return;

  const className = elem?.className;

  if(typeof className !== 'string') return removeClass({});
  
  if(className?.includes('show-dropdown')) return;

  if(className?.includes('button-dropdown')) return removeClass({elem});

  removeClass({});
};
