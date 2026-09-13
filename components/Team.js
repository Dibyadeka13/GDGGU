const team = [
  { name: "NITIN DA", role: "CEO", photo: "/team/nt.jpeg" },
  { name: "SAMPURNA BAA", role: "Co-Lead", photo: "/team/sm.jpeg" },
  { name: "THAPA DA", role: "Web Team", photo: "/team/th.jpeg" },
  { name: "PRANAJAN", role: "PR Team", photo: "/team/pj.jpeg" },
  { name: "BHAIRAB", role: "AI Team", photo: "/team/bh.jpeg" },
  { name: "NOOB DIBYA", role: "Social Media", photo: "/team/dj.jpg" },
]

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Team() {
  return (
    <section id="team" className="section">
      <div className="container">
        <h2>Our Team</h2>
        <p className="subtitle">Meet the people behind GDGGU</p>
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="avatar">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  getInitials(member.name)
                )}
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
