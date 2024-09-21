import Breadcrumbs from '@/app/ui/hobbies/breadcrumbs';
import CreateForm from '@/app/ui/hobbies/create-form';
 
export default function Page() { 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Hobbies', href: '/dashboard/hobbies' },
          {
            label: 'Add Hobby',
            href: '/dashboard/hobbies/add',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}