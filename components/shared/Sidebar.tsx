import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  description: string;
}

interface FramerTextProps {
  delay: number;
}

const framerText = ({ delay }: FramerTextProps) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.3 },
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);

  const items: SidebarItem[] = [
    { title: 'Name', description: 'Filler description. more more more more more more more more more more \n more more mroemoremoremore'},
    { title: 'About', description: 'Filler description'},
    { title: 'Order History', description: 'Filler description'},
    { title: 'Requests', description: 'Filler description'},
    { title: 'Shop', description: 'Filler description'},
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 border-zinc-800 rounded-xl"
        aria-label="toggle sidebar"
      >
        {/*HERE IS WHERE IT TRIGGERS OPENING*/}
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-[#cbd1d6] bg-[#f1f5f9]"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-[#cbd1d6]" style={{ color: '#505559' }}>
                <span>FILLER</span>
                <button
                  onClick={toggleSidebar}
                  aria-label="close sidebar"
                >
                </button>
              </div>
              <ul>
                {items.map((item, idx) => (
                  <li key={item.title}>
                    <a
                      onClick={toggleSidebar}
                      className="flex flex-col gap-2 p-5 transition-all border-b-2 hover:bg-[#cbd1d6] border-[#cbd1d6]"
                      >
                      <motion.span {...framerText({ delay: idx })} style={{ color: '#505559', fontWeight: 'bold' }}>
                        {item.title}
                      </motion.span>

                      <motion.span {...framerText({ delay: idx })} style={{ fontSize: '0.8em', color: '#505559' }}>
                      {item.description}
                      </motion.span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

  