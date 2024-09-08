import EditForm from '@/app/ui/posts/edit-form';
import Breadcrumbs from '@/app/ui/posts/breadcrumbs';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm id={id} />
    </main>
  );
}