import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from '../app/Heros.module.css';
import { Icon, Menu } from 'lucide-react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { Input } from '@/components/ui/input'; // Replace with actual path
import { Button } from '@/components/ui/button'; // Replace with actual path
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { AvatarImage } from './ui/avatar';
import { Avatar } from '@radix-ui/react-avatar';



interface Hero {
  HeroName: string;
  NumberOfMessages: number;
  Description: string;
  Image: string;
  id: number;
  category: string;
  Url: string;
  MessageCircle: Icon;
  Menu: Icon;
}

interface Group {
  id: number;
  GroupMember: string;
 
}

export const Heros: React.FC<Hero> = ({ MessageCircle: IconComponent, Menu: MenuComponent }) => {
  const [slides, setSlides] = useState<Hero[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [groupMembers, setGroupMembers] = useState<Group[]>([]);
 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    nameRoom: '',
    describeRoom: '',
  });
  const [nameRoom, setNameRoom] = useState('');
  const [describeRoom, setDescribeRoom] = useState('');


  const handleMenuToggle = (index: number) => {
    setIsMenuOpen(isMenuOpen === index ? null : index);
  };

  const handleAddToGroup = (slide: Hero) => {
    // Check if the member already exists in the group
    if (groupMembers.some((member) => member.GroupMember === slide.HeroName)) {
      //console.log(`${slide.HeroName} is in the group.`);
      toast.error(` ${slide.HeroName} already added to room`);
      return; // Do not add duplicate members
    }

   
  
    

    if (groupMembers.length < 4) {
      // Show toast with a choice to add more members or not
      toast.success(
        <>
          <div>
            Added {slide.HeroName} to room, do you want more members?
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => {
                toast.dismiss();
              }}
              className="bg-green-500 px-4 py-2 text-white rounded"
            >
              YES
            </button>
            <button
              onClick={() => {
                // User doesn't want more members
                setIsDialogOpen(true); // Show the dialog
                toast.dismiss();
              }}
              className="bg-red-500 px-4 py-2 text-white rounded"
            >
              NO
            </button>
          </div>
        </>,
        {
          icon: '👥',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 3000, // Set a longer duration to give users time to decide
        }
      );
    // Generate a unique id for the new group member
    const newMemberId = groupMembers.length + 1;
    // Create a new group member object
    const newGroupMember: Group = {
      id: newMemberId,
      GroupMember: slide.HeroName,
    
    };  

   

    // Update the group members state
    setGroupMembers((prevGroupMembers) => [...prevGroupMembers, newGroupMember]);
    setIsDialogOpen(true);
    
    }else{
      toast.error("Max Members 4")
      setIsDialogOpen(true);

    }
  };
   
  const handleSearch = () => {
    // Filter your slides based on searchName and searchCategory here
    const filteredSlides = slides.filter(
      (slide) =>
        slide.HeroName.toLowerCase().includes(searchName.toLowerCase()) &&
        (searchCategory === '' || slide.category === searchCategory)
    );
    return filteredSlides;
  };

  const categoryButtons = [
    { label: 'All', variant: 'secondary', category: '' },
    { label: 'Actor', variant: 'secondary', category: 'Actor' },
    { label: 'President', variant: 'secondary', category: 'President' },
    { label: 'Cartoon', variant: 'secondary', category: 'Cartoon' },
    // Add more buttons as needed with their respective categories
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post('/api/cmessage');
        setSlides(data);
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []); // Empty dependency array, run effect only on mount

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const addChatRoom = async () => {
    // Perform form validation
    let isValid = true;
  
    if (nameRoom.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, nameRoom: 'Name is required' }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, nameRoom: '' }));
    }
  
    if (describeRoom.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, describeRoom: 'Description is required' }));
      isValid = false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, describeRoom: '' }));
    }
  
    // If the form is valid, proceed with adding the chat room
    if (isValid) {
      // Extract avatar URLs from the slides using the groupMembers
      const avatarUrls = groupMembers.map((member) =>
        slides.find((slide) => slide.HeroName === member.GroupMember)?.Image || ''
      );
      
      if (groupMembers.length < 2){
        toast.error("You need at least 2 members in a room")
        return
      }


      const filteredAvatarUrls = avatarUrls.filter(url => !url.startsWith('data:image/'));
      const formattedAvatarUrls = filteredAvatarUrls.join(', ');

      // Add your logic here to create the chat room
      console.log('Chat room created:', { nameRoom, describeRoom, groupMembers, avatarUrls });
  
      const res = await axios.post('/api/chatroom', {
        nameRoom,
        describeRoom,
        groupMembers: groupMembers.map((member) => member.GroupMember).join(', '),
        avatarUrls: formattedAvatarUrls, // Send avatar URLs to the API
       
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
     
      // Close the dialog
      setIsDialogOpen(false);
  
      // Clear form fields
      setNameRoom('');
      setDescribeRoom('');
      setGroupMembers([]);
      toast.success('Room Created Successfully!');
    }
  };
  


  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameRoom(e.target.value);
    // Validate the name here
    if (e.target.value.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, nameRoom: 'Name is required' }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, nameRoom: '' }));
    }
  };
  
  const handleDescribeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescribeRoom(e.target.value);
    // Validate the description here
    if (e.target.value.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, describeRoom: 'Description is required' }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, describeRoom: '' }));
    }
  };
  

  return (
    <div className="container mx-auto mt-8 p-4 relative object-cover rounded-lg b-1">
      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border-2 border-purple-500 rounded-lg focus:outline-none focus:border-pink-500"
        />

        <Button
          type="button"
          onClick={() => setSearchCategory('')}
          className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none"
        >
          Show All
        </Button>
      </div>

      <Swiper
        direction={'horizontal'}
        slidesPerView={4}
        spaceBetween={55}
        slidesPerGroup={3}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, FreeMode, Navigation]}
        className=""
      >
        {categoryButtons.map((button, index) => (
          <SwiperSlide key={index}>
            <Button
              variant={button.variant as "link" | "premium" | "secondary" | "default" | "destructive" | "outline" | "ghost" | null | undefined}
              onClick={() => setSearchCategory(button.category)}
            >
              {button.label}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        direction={'horizontal'}
        slidesPerView={3}
        spaceBetween={5}
        slidesPerGroup={5}
        mousewheel={true}
        navigation={true}
        freeMode={true}
        modules={[Mousewheel, Navigation, FreeMode]}
        className="HeroSwiper mb-8 p-4 h-55"
        style={{ height: '55rem' }} // Adjusted height to 55rem, you can change this value
      >
        {handleSearch().length > 0 ? (
          handleSearch().map((slide, index) => {
          

            return (
              <SwiperSlide key={index}>
                <a
                  href={slide.Url}
                  className="relative block flex-shrink-0 top-5 left-5 hover:border-grey hover:bg-gray-700 rounded-lg gap-4 mx-auto"
                >
                  <div className="flex justify-center p-4 ">
                    <Image
                      src={slide.Image}
                      alt={slide.HeroName}
                      className={`object-cover rounded-lg ${styles.glowOnHover}`}
                      width={150}
                      height={150}
                    />
                  </div>
                </a>
                <div className="relative text-center">
                  <h1 className="text-violet-500 text-xs font-bold justify-center items-center p-4">{slide.HeroName}</h1>
                  <div className="text-xs text-grey-800 p-2 mx-auto">{slide.Description}</div>

                  <div className="relative">
                    <div className="flex items-center absolute text-violet-100 text-xs p-2">
                      <div className='text-xs mr-12'>@zser</div>
                      <div className='flex-grow'></div>
                      {IconComponent && <IconComponent size="14" className="flex text-violet-400 text-xs" />}
                      <div className='flex'>{slide.NumberOfMessages}</div>
                      {MenuComponent && (
                        <MenuComponent
                          size="14"
                          className="flex text-violet-400 text-xs cursor-pointer mb-0"
                          onClick={() => handleMenuToggle(index)}
                        />
                      )}

                      {isMenuOpen === index && (
                        <div className="absolute right-0 top-0 mt-8 bg-black border border-gray-300 rounded-lg shadow-md p-2 z-10 ">
                          <div className="cursor-pointer hover:bg-gray-800 " onClick={() => handleAddToGroup(slide)}>
                            Add to Group Chat
                          </div>
                          {/* Add more options as needed */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div className='mt-2 flex justify-center items-center mr-0'>No results found</div>
        )}
      </Swiper>

    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
  <DialogTitle>CREATE ROOM</DialogTitle>
  <DialogContent>
    <h1 className='flex items-center justify-center text-xl text-white-100 font-bold'>
      Start a Chat Room
    </h1>
    <div className='grid grid-cols-2 gap-4 items-center justify-center p-2'>
      <div>
        <div className='text-lg text-violet-300 p-2 text-white-100 mb-55'>
          Chat Room Members:
        </div>
        <div className='text-lg text-violet-500 p-2 text-white-200 relative'>
          {groupMembers.map((member, index) => (
            <React.Fragment key={member.id}>
              {/*member.GroupMember*/}
              <Avatar
                className="h-10 w-10 rounded-lg  border-violet-500"
                style={{
                  zIndex: groupMembers.length - index, // Increase z-index for each member
                  position: 'absolute',
                  left: `${index * 1.5}rem`, // Adjust left position for spacing
                  
                }}
              >
                {/* Use optional chaining and nullish coalescing to handle undefined or null */}
                {slides.find((slide) => slide.HeroName === member.GroupMember)?.Image && (
                  <AvatarImage
                    className="h-10 w-10 rounded-full border-2 border-violet-500 text-violet-500 bg-opacity-50 overflow-hidden"
                    src={slides.find((slide) => slide.HeroName === member.GroupMember)?.Image || ''}
                  />
                )}
              </Avatar>
            </React.Fragment>
          ))}
        </div>
      </div>


      <div className='grid grid-cols-1 gap-4'>
        <div>
          <div className='text-lg text-violet-300 p-2 text-white-100'>
            Name the Room:
          </div>
          <div className='grid grid-cols-2'>
            <Input
              type="text"
              placeholder="Name the Room!"
              value={nameRoom}
              onChange={handleNameChange}

              className={`p-2 mt-4 border-2 rounded-lg focus:outline-none ${
                formErrors.nameRoom ? 'border-red-500' : 'border-purple-500'
              }`}
            />
            {formErrors.nameRoom && (
              <div className="text-red-500 text-sm mt-1">{formErrors.nameRoom}</div>
            )}
          </div>
        </div>

        <div>
          <div className='text-lg text-violet-300 p-2 text-white-100'>
            Describe the room:
          </div>
          <div className='grid grid-cols-2'>
            <Input
              type="text"
              placeholder="What's the room about?"
              value={describeRoom}
              onChange={handleDescribeChange} 
              className={`p-2 mt-4 border-2 rounded-lg focus:outline-none ${
                formErrors.describeRoom ? 'border-red-500' : 'border-purple-500'
              }`}
            />
            {formErrors.describeRoom && (
              <div className="text-red-500 text-sm mt-1">{formErrors.describeRoom}</div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <Button variant="ghost" onClick={addChatRoom}>
        Create Room
      </Button>
    </div>
  </DialogContent>
</Dialog>


    </div>
  );
};

export default Heros;
