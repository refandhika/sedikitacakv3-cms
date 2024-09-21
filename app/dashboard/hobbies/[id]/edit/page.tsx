import EditForm from '@/app/ui/hobbies/edit-form';
import Breadcrumbs from '@/app/ui/hobbies/breadcrumbs';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Hobbies', href: '/dashboard/hobbies' },
          {
            label: 'Edit Hobby',
            href: `/dashboard/hobbies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}