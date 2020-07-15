import React from 'react';
import * as Contacts from 'expo-contacts';
import _ from 'lodash';

function getContactNumber(contact) {
  let contactPhoneNumber;
  contact.phoneNumbers?.forEach((phoneNumber) => {
    if (phoneNumber.label == 'mobile') {
      if(phoneNumber.digits) {
        contactPhoneNumber = phoneNumber.digits;
      } else if(phoneNumber.number) {
        contactPhoneNumber = phoneNumber.number;
      }
    }
  });

  return contactPhoneNumber;
}

export default function useContacts(allowed) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const f = async () => {
      if (allowed) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setData(data);
      }
    };
    f();
  }, [allowed, setData]);

  if (!allowed) {
    return [];
  }

  if (data.length === 0) {
    return [];
  }

  const contacts = [];
  data
    .filter((contact) => contact.contactType === 'person')
    .filter((contact) => contact.name.match(/[a-zA-Z]/))
    .forEach((contact) => {
      const contactPhoneNumber = getContactNumber(contact);

      if (!contactPhoneNumber) {
        return;
      }

      const contactToShow = {
        type: 'contact',
        name: contact.name,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contactPhoneNumber,
        // turns out phone numbers can exist in the book multiple times
        // even this seems like an imperfect solution
        id: `${contactPhoneNumber}${contact.name}`,
      };
      contacts.push(contactToShow);
    });

  return _.uniqBy(contacts, 'id');
}
