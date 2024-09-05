import EditForm from '@/app/ui/users/edit-form';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';
 
export default async function Page({ params }: { params: { uuid: string } }) {
  const id = params.uuid;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit Users',
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}